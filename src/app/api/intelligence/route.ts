import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.Groq_API_Key
});

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
    return stories.filter(s => s && s.title).map(s => s.title).join('\n');
  } catch (e) {
    console.error('HN fetch failed', e);
    return '';
  }
}

async function fetchGitHub(stackItems: string[]) {
  try {
    const updates = await Promise.all(
      stackItems.slice(0, 3).map(async (item) => { // Limit to 3 items to avoid timeouts
        try {
          const res = await fetch(`https://api.github.com/search/repositories?q=${item}&sort=updated&order=desc&per_page=2`, {
            headers: { 'User-Agent': 'Technical-Radar-App' },
            signal: AbortSignal.timeout(5000)
          });
          if (!res.ok) return '';
          const data = await res.json();
          return data.items?.map((repo: any) => `${item}: ${repo.full_name} - ${repo.description}`).join('\n') || '';
        } catch { return ''; }
      })
    );
    return updates.filter(u => u).join('\n');
  } catch (e) {
    console.error('GitHub fetch failed', e);
    return '';
  }
}

export async function GET() {
  try {
    let stackItems = ['MongoDB', 'PostgreSQL', 'Next.js', 'React', 'Tailwind CSS'];
    
    try {
      const client = await clientPromise;
      const db = client.db('technicalRadar');
      const userStack = await db.collection('userStack').findOne({ id: 'current_user' });
      if (userStack?.items?.length) {
        stackItems = userStack.items;
      }
    } catch (dbError) {
      console.warn('DB connection failed, using default stack items', dbError);
    }

    const [hnData, githubData] = await Promise.all([
      fetchHN(),
      fetchGitHub(stackItems)
    ]);

    const prompt = `
      You are an AI Architecture Consultant. Analyze the following technical updates and provide architecture insights for a stack containing: ${stackItems.join(', ')}.
      
      Hacker News Top Stories:
      ${hnData || 'No recent stories found.'}
      
      GitHub Recent Updates:
      ${githubData || 'No recent updates found.'}
      
      Provide the analysis in the following JSON format:
      {
        "risks": [{"title": "...", "desc": "...", "time": "...", "icon": "...", "color": "rose", "category": "risks"}],
        "opportunities": [{"title": "...", "desc": "...", "time": "...", "icon": "...", "color": "emerald", "category": "opportunities"}],
        "info": [{"title": "...", "desc": "...", "time": "...", "icon": "...", "color": "slate", "category": "info"}]
      }
      Limit to 2-3 items per category. Use meaningful Material Symbols names for icons. Ensure colors are strictly as specified.
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return NextResponse.json(result);
  } catch (e) {
    console.error('Intelligence analysis error:', e);
    // Fallback static data if everything fails
    return NextResponse.json({
      risks: [{ title: 'Service Interruption', desc: 'Connectivity issues detected. Showing cached insights.', time: 'Just now', icon: 'cloud_off', color: 'rose', category: 'risks' }],
      opportunities: [],
      info: [{ title: 'System Status', desc: 'Retrying connection to architecture intelligence services...', time: '1m ago', icon: 'sync', color: 'slate', category: 'info' }]
    });
  }
}
