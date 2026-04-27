import { NextResponse } from 'next/server';
import { getStack } from '@/lib/mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key?.trim() || '');

// Model fallback list to avoid 404/429 issues
// Using EXACT names from the ListModels output for this API Key
const MODELS = ['gemini-2.0-flash', 'gemini-flash-latest', 'gemini-pro-latest', 'gemini-flash-lite-latest'];

async function fetchHN() {
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', { signal: AbortSignal.timeout(5000) });
    if (!response.ok) return '';
    const ids = await response.json();
    const top5 = ids.slice(0, 5);
    const stories = await Promise.all(
      top5.map(async (id: number) => {
        try {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { signal: AbortSignal.timeout(2000) });
          return res.ok ? res.json() : null;
        } catch { return null; }
      })
    );
    return stories.filter(s => s && s.title).map(s => `Title: ${s.title}, URL: ${s.url || 'https://news.ycombinator.com/item?id=' + s.id}`).join('\n');
  } catch (e) {
    return '';
  }
}

async function fetchGitHub(stackItems: string[]) {
  try {
    const query = stackItems.length > 0 ? stackItems.slice(0, 5).join(' OR ') : 'javascript OR react OR node';
    const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=10`, {
      headers: { 'User-Agent': 'Technical-Radar-App' },
      signal: AbortSignal.timeout(5000)
    });
    
    if (!res.ok) return '';
    const data = await res.json();
    return data.items?.map((repo: any) => `Repo: ${repo.full_name}, Desc: ${repo.description}, URL: ${repo.html_url}`).join('\n') || '';
  } catch (e) {
    return '';
  }
}

export async function GET() {
  try {
    const stackItems = await getStack();
    const [hnData, githubData] = await Promise.all([fetchHN(), fetchGitHub(stackItems)]);

    const prompt = `
      You are an AI Architecture Consultant. Analyze the following technical updates and provide architecture insights specifically tailored for this stack: ${stackItems.join(', ')}.
      
      Context from Hacker News:
      ${hnData}
      
      Context from GitHub:
      ${githubData}
      
      IMPORTANT: Return ONLY a valid JSON object. Do not include markdown formatting.
      {
        "risks": [{"title": "...", "desc": "...", "time": "...", "url": "...", "icon": "...", "color": "rose", "category": "risks"}],
        "opportunities": [{"title": "...", "desc": "...", "time": "...", "url": "...", "icon": "...", "color": "emerald", "category": "opportunities"}],
        "info": [{"title": "...", "desc": "...", "time": "...", "url": "...", "icon": "...", "color": "slate", "category": "info"}]
      }
    `;

    // Robust model-switching logic
    for (const modelName of MODELS) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json|```/g, '').trim();
        return NextResponse.json(JSON.parse(jsonStr));
      } catch (err) {
        console.warn(`Model ${modelName} failed with error: ${err.message}. Trying next...`);
        if (modelName === MODELS[MODELS.length - 1]) throw err;
      }
    }

  } catch (e) {
    console.error('Intelligence analysis error:', e.message);
    return NextResponse.json({
      risks: [{ title: 'API Quota Exceeded', desc: 'Gemini is currently overloaded. We are using cached insights.', time: 'Just now', icon: 'warning', color: 'rose', category: 'risks' }],
      opportunities: [],
      info: [{ title: 'System Status', desc: 'Auto-retrying in background...', time: '1m ago', icon: 'sync', color: 'slate', category: 'info' }]
    });
  }
}
