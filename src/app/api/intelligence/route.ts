import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.Groq_API_Key
});

async function fetchHN() {
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    if (!response.ok) return '';
    const ids = await response.json();
    const top10 = ids.slice(0, 10);
    const stories = await Promise.all(
      top10.map(async (id: number) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return res.ok ? res.json() : null;
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
      stackItems.map(async (item) => {
        const res = await fetch(`https://api.github.com/search/repositories?q=${item}&sort=updated&order=desc&per_page=3`, {
          headers: {
            'User-Agent': 'Technical-Radar-App'
          }
        });
        if (!res.ok) {
          console.warn(`GitHub API error for ${item}: ${res.statusText}`);
          return '';
        }
        const data = await res.json();
        return data.items?.map((repo: any) => `${item}: ${repo.full_name} - ${repo.description}`).join('\n') || '';
      })
    );
    return updates.join('\n');
  } catch (e) {
    console.error('GitHub fetch failed', e);
    return '';
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('technicalRadar');
    const userStack = await db.collection('userStack').findOne({ id: 'current_user' });
    const stackItems = userStack?.items || ['MongoDB', 'PostgreSQL', 'Next.js', 'React', 'Tailwind CSS'];

    const [hnData, githubData] = await Promise.all([
      fetchHN(),
      fetchGitHub(stackItems)
    ]);

    const prompt = `
      You are an AI Architecture Consultant. Analyze the following technical updates and provide architecture insights for a stack containing: ${stackItems.join(', ')}.
      
      Hacker News Top Stories:
      ${hnData}
      
      GitHub Recent Updates:
      ${githubData}
      
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
      model: 'mixtral-8x7b-32768',
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to analyze intelligence' }, { status: 500 });
  }
}
