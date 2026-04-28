import { NextResponse } from 'next/server';
import { getStack } from '@/lib/mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key?.trim() || '');
// Use gemini-flash-latest which acts as gemini-1.5-flash for this API Key, fallback to 2.0
const MODELS = ['gemini-flash-latest', 'gemini-2.0-flash', 'gemini-pro-latest'];

// In-memory cache variables
let intelligenceCache: any = null;
let cacheTimestamp: number = 0;
let cacheStackString: string = '';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

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

    // 1. Check in-memory cache
    if (intelligenceCache && (Date.now() - cacheTimestamp < CACHE_TTL) && cacheStackString === currentStackString) {
      return NextResponse.json({ ...intelligenceCache, lastUpdated: new Date(cacheTimestamp).toISOString() });
    }

    // 2. Fetch external APIs in parallel to reduce latency
    const [hnData, githubData] = await Promise.all([
      fetchHN(),
      fetchGitHub(stackItems)
    ]);

    const stackContext = stackItems.length > 0 ? currentStackString : 'general modern web development';

    const prompt = `
      You are an AI Architecture Consultant. Provide real-time architecture insights specifically tailored for this tech stack: ${stackContext}.
      
      Recent ecosystem context (max 5 items each):
      HackerNews:
      ${hnData || 'No recent news.'}
      GitHub:
      ${githubData || 'No recent updates.'}
      
      IMPORTANT: Return ONLY a valid JSON object. Do not include markdown formatting.
      {
        "risks": [{"title": "...", "desc": "...", "time": "Just now", "url": "", "icon": "warning", "color": "rose", "category": "risks"}],
        "opportunities": [{"title": "...", "desc": "...", "time": "Just now", "url": "", "icon": "trending_up", "color": "emerald", "category": "opportunities"}],
        "info": [{"title": "...", "desc": "...", "time": "Just now", "url": "", "icon": "info", "color": "slate", "category": "info"}]
      }
    `;

    // 3. Robust model-switching logic
    for (let i = 0; i < MODELS.length; i++) {
      try {
        const model = genAI.getGenerativeModel({ model: MODELS[i] });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json|```/g, '').trim();
        const parsedData = JSON.parse(jsonStr);

        // Update cache
        intelligenceCache = parsedData;
        cacheTimestamp = Date.now();
        cacheStackString = currentStackString;

        return NextResponse.json({ ...parsedData, lastUpdated: new Date(cacheTimestamp).toISOString() });
      } catch (err) {
        if (i === MODELS.length - 1) throw err;
      }
    }

  } catch (e) {
    console.warn('Intelligence analysis error, falling back to static cache:', e.message);
    
    // 4. If Gemini fails, return last cached data or a rich static fallback to keep the app working
    const fallbackData = intelligenceCache ? intelligenceCache : STATIC_FALLBACK;
    
    return NextResponse.json({
      ...fallbackData,
      lastUpdated: new Date().toISOString(),
      isStale: true
    });
  }
}
