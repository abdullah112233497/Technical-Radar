import { NextResponse } from 'next/server';
import { getStack } from '@/lib/mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key?.trim() || '');

// Model fallback list to avoid 404/429 issues
// Using EXACT names from the ListModels output for this API Key
const MODELS = ['gemini-2.0-flash', 'gemini-flash-latest', 'gemini-pro-latest', 'gemini-flash-lite-latest'];

async function fetchContext(stackItems: string[]) {
  try {
    const query = stackItems.length > 0 ? stackItems.slice(0, 5).join(' OR ') : 'javascript OR react OR node';
    const githubRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=5`, {
      headers: { 'User-Agent': 'Technical-Radar-App' },
      signal: AbortSignal.timeout(5000)
    });
    const githubData = githubRes.ok ? await githubRes.json() : { items: [] };

    const hnRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', { signal: AbortSignal.timeout(5000) });
    const hnIds = hnRes.ok ? await hnRes.json() : [];
    const hnTop = hnIds.slice(0, 5);
    const hnStories = await Promise.all(
      hnTop.map(async (id: number) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return res.ok ? res.json() : null;
      })
    );

    return {
      github: githubData.items?.map((repo: any) => `${repo.full_name}: ${repo.description}`).join('\n'),
      hn: hnStories.filter(s => s).map(s => s.title).join('\n')
    };
  } catch (e) {
    return { github: '', hn: '' };
  }
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const stackItems = await getStack();
    const context = await fetchContext(stackItems);

    const systemInstruction = `
      You are an AI Architecture Assistant for a Technical Founder.
      The user's current technology stack is: ${stackItems.join(', ')}.
      
      Real-time context from the ecosystem:
      GitHub Updates:
      ${context.github}
      
      Hacker News Trends:
      ${context.hn}
      
      Your goal is to help the user make strategic decisions about their stack. 
      Answer questions based on the provided context and your internal knowledge.
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

    // Robust model-switching logic
    for (const modelName of MODELS) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName, systemInstruction });
        const chat = model.startChat({ history: validHistory });
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        return NextResponse.json({ content: response.text() });
      } catch (err) {
        console.warn(`Model ${modelName} failed with error: ${err.message}. Trying next...`);
        if (modelName === MODELS[MODELS.length - 1]) throw err;
      }
    }

  } catch (e) {
    console.error('Chat error:', e.message);
    return NextResponse.json({ 
      content: "I'm currently experiencing high traffic or quota limits (429). Please wait about 30 seconds and try again! My brain is recovering." 
    }, { status: 200 });
  }
}
