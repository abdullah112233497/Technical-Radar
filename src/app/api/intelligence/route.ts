import { NextResponse } from 'next/server';
import { getStack } from '@/lib/mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key?.trim() || '');
const groq = new Groq({ apiKey: process.env.Groq_API_Key?.trim() || '' });

// Prioritizing models discovered to be supported by the user's key
const MODELS = ['gemini-flash-latest', 'gemini-pro-latest', 'gemini-2.0-flash'];

const STATIC_FALLBACK = {
  risks: [
    { title: 'Dependency Vulnerability', desc: 'Critical security update available for core framework components. Immediate patching recommended.', time: 'Just now', icon: 'warning', color: 'rose', category: 'risks' },
    { title: 'Rate Limiting Needed', desc: 'High traffic detected without proper API gateway rate limiting, leading to potential DDoS vectors.', time: '10m ago', icon: 'gpp_bad', color: 'rose', category: 'risks' }
  ],
  opportunities: [
    { title: 'Edge Caching Implementation', desc: 'Moving static assets to the Edge network can reduce latency by up to 40% globally.', time: 'Just now', icon: 'trending_up', color: 'emerald', category: 'opportunities' },
    { title: 'Serverless Functions', desc: 'Migrating background jobs to serverless can dramatically cut down on baseline hosting costs.', time: '1h ago', icon: 'bolt', color: 'emerald', category: 'opportunities' }
  ],
  info: [
    { title: 'Ecosystem Update', desc: 'New minor version released for your primary database driver offering slight performance gains.', time: '2h ago', icon: 'info', color: 'slate', category: 'info' }
  ]
};

async function fetchHN() {
  try {
    const response = await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=front_page&hitsPerPage=5', { 
      signal: AbortSignal.timeout(1500) 
    });
    if (!response.ok) return '';
    const data = await response.json();
    return data.hits.map((s: any) => `- ${s.title}`).join('\n');
  } catch (e) {
    return '';
  }
}

async function fetchGitHub(stackItems: string[]) {
  try {
    const query = stackItems.length > 0 ? stackItems.slice(0, 5).join(' OR ') : 'javascript OR react';
    const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=5`, {
      headers: { 'User-Agent': 'Technical-Radar-App' },
      signal: AbortSignal.timeout(1500)
    });
    if (!res.ok) return '';
    const data = await res.json();
    return data.items?.map((repo: any) => `- ${repo.full_name}: ${repo.description}`).join('\n') || '';
  } catch (e) {
    return '';
  }
}

export async function GET() {
  try {
    const stackItems = await getStack();
    const currentStackString = stackItems.join(',');

    // 1. Fetch external APIs in parallel to reduce latency
    const [hnData, githubData] = await Promise.all([
      fetchHN(),
      fetchGitHub(stackItems)
    ]);

    const stackContext = stackItems.length > 0 ? currentStackString : 'general modern web development';

    const prompt = `
      You are an AI Architecture Consultant. Provide real-time architecture insights specifically tailored for this tech stack: ${stackContext}.
      HackerNews: ${hnData || 'No recent news.'}
      GitHub: ${githubData || 'No recent updates.'}
      
      IMPORTANT: Return ONLY a valid JSON object.
      {
        "risks": [{"title": "...", "desc": "...", "time": "Just now", "url": "", "icon": "warning", "color": "rose", "category": "risks"}],
        "opportunities": [{"title": "...", "desc": "...", "time": "Just now", "url": "", "icon": "trending_up", "color": "emerald", "category": "opportunities"}],
        "info": [{"title": "...", "desc": "...", "time": "Just now", "url": "", "icon": "info", "color": "slate", "category": "info"}]
      }
    `;

    // 2. Attempt Gemini Models
    for (let i = 0; i < MODELS.length; i++) {
      try {
        const model = genAI.getGenerativeModel({ model: MODELS[i] });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json|```/g, '').trim();
        return NextResponse.json({ ...JSON.parse(jsonStr), lastUpdated: new Date().toISOString() });
      } catch (err) {}
    }

    // 3. Fallback to Groq for analysis
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        response_format: { type: 'json_object' }
      });
      const content = chatCompletion.choices[0]?.message?.content || '';
      return NextResponse.json({ ...JSON.parse(content), lastUpdated: new Date().toISOString(), isGroq: true });
    } catch (groqErr) {}

    // 4. Final Fallback to static data
    return NextResponse.json({ ...STATIC_FALLBACK, lastUpdated: new Date().toISOString(), isStale: true });

  } catch (e) {
    return NextResponse.json({ ...STATIC_FALLBACK, lastUpdated: new Date().toISOString(), isStale: true });
  }
}

