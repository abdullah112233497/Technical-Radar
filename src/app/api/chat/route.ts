import { NextResponse } from 'next/server';
import { getStack } from '@/lib/mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key?.trim() || '');

// Use gemini-flash-latest which acts as gemini-1.5-flash for this API Key, fallback to 2.0
const MODELS = ['gemini-flash-latest', 'gemini-2.0-flash', 'gemini-pro-latest'];

// In-memory cache for context to speed up chat
let contextCache: any = null;
let cacheTimestamp: number = 0;
let cacheStackString: string = '';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

async function fetchContext(stackItems: string[]) {
  const currentStackString = stackItems.join(',');
  
  // Return cached context if valid
  if (contextCache && (Date.now() - cacheTimestamp < CACHE_TTL) && cacheStackString === currentStackString) {
    return contextCache;
  }

  const query = stackItems.length > 0 ? stackItems.slice(0, 5).join(' OR ') : 'javascript OR react OR node';
  
  const [githubRes, hnRes] = await Promise.all([
    fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=5`, {
      headers: { 'User-Agent': 'Technical-Radar-App' },
      signal: AbortSignal.timeout(1500)
    }).catch(() => null),
    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=front_page&hitsPerPage=5', { 
      signal: AbortSignal.timeout(1500)
    }).catch(() => null)
  ]);

  const githubData = githubRes?.ok ? await githubRes.json() : { items: [] };
  const hnData = hnRes?.ok ? await hnRes.json() : { hits: [] };

  const newContext = {
    github: githubData.items?.map((repo: any) => `- ${repo.full_name}: ${repo.description}`).join('\n') || '',
    hn: hnData.hits?.map((s: any) => `- ${s.title}`).join('\n') || ''
  };

  // Update cache
  contextCache = newContext;
  cacheTimestamp = Date.now();
  cacheStackString = currentStackString;

  return newContext;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const stackItems = await getStack();
    const stackContext = stackItems.length > 0 ? stackItems.join(', ') : 'general modern web development';

    const context = await fetchContext(stackItems);

    const systemInstruction = `
      You are an AI Architecture Assistant for a Technical Founder.
      The user's current technology stack is: ${stackContext}.
      
      Recent ecosystem context:
      GitHub:
      ${context.github || 'No recent updates.'}
      HackerNews:
      ${context.hn || 'No recent news.'}
      
      Your goal is to help the user make strategic decisions about their stack. 
      Answer questions using your extensive internal knowledge of software architecture, current ecosystem trends, and best practices.
      Be concise, professional, and focus on architectural implications.
    `;

    const history = messages.slice(0, -1)
      .filter((m: any) => m.content && m.content.trim() !== '')
      .map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    const firstUserIndex = history.findIndex((m: any) => m.role === 'user');
    const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];
    const lastMessage = messages[messages.length - 1].content;

    // Robust model-switching logic for maximum speed and uptime
    for (let i = 0; i < MODELS.length; i++) {
      try {
        const model = genAI.getGenerativeModel({ model: MODELS[i], systemInstruction });
        const chat = model.startChat({ history: validHistory });
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        return NextResponse.json({ content: response.text(), lastUpdated: new Date().toISOString() });
      } catch (err) {
        if (i === MODELS.length - 1) throw err;
      }
    }

  } catch (e) {
    console.error('Chat error:', e.message);
    return NextResponse.json({ 
      content: "I'm currently experiencing high traffic or quota limits (429). Please wait about 30 seconds and try again! My brain is recovering.",
      lastUpdated: new Date().toISOString(),
      isStale: true
    }, { status: 200 });
  }
}
