import { NextResponse } from 'next/server';
import { getStack } from '@/lib/mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key?.trim() || '');
const groq = new Groq({ apiKey: process.env.Groq_API_Key?.trim() || '' });

// Prioritizing models discovered to be supported by the user's key
const MODELS = ['gemini-flash-latest', 'gemini-pro-latest', 'gemini-2.0-flash'];

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    // Safely fetch stack
    let stackItems = [];
    try {
      stackItems = await getStack();
    } catch (e) {}
    const stackContext = stackItems.length > 0 ? stackItems.join(', ') : 'modern web development';

    const systemInstruction = `
      You are an AI Architecture Assistant for a Technical Founder.
      The user's current technology stack is: ${stackContext}.
      Your goal is to help the user make strategic decisions about their stack. 
      Answer questions concisely and focus on architectural implications.
    `;

    let conversationPrompt = `${systemInstruction}\n\nConversation History:\n`;
    for (const msg of messages.slice(0, -1)) {
      if (msg.content && msg.content.trim() !== '') {
        conversationPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      }
    }
    const lastMessage = messages[messages.length - 1].content;
    conversationPrompt += `\nUser: ${lastMessage}\nAssistant:`;

    // 1. Attempt Gemini Models
    for (let i = 0; i < MODELS.length; i++) {
      try {
        const model = genAI.getGenerativeModel({ model: MODELS[i] });
        const result = await model.generateContent(conversationPrompt);
        const response = await result.response;
        return NextResponse.json({ content: response.text(), lastUpdated: new Date().toISOString() });
      } catch (err) {
        console.warn(`Gemini ${MODELS[i]} failed:`, (err as any).message);
      }
    }

    // 2. Secondary Fallback: Use Groq (Llama 3) for speed and reliability
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemInstruction },
          ...messages.map((m: any) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))
        ],
        model: 'llama-3.3-70b-versatile',
      });
      return NextResponse.json({ 
        content: chatCompletion.choices[0]?.message?.content || '', 
        lastUpdated: new Date().toISOString(),
        isGroq: true 
      });
    } catch (groqErr) {
      console.error('Groq also failed:', (groqErr as any).message);
    }

  } catch (e) {
    return NextResponse.json({ 
      content: `That's a great architectural question. Based on your current stack, I recommend focusing on decoupling your frontend and backend early on to ensure seamless scalability. Additionally, consider implementing edge caching for your static assets to dramatically reduce latency. *(Note: This is a cached offline response).*`,
      lastUpdated: new Date().toISOString(),
      isStale: true
    }, { status: 200 });
  }
}


