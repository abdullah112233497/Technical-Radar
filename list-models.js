const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key.trim());

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.Gemini_API_Key.trim()}`);
    const data = await response.json();
    console.log('Available models:', data.models.map(m => m.name));
  } catch (e) {
    console.error('Failed to list models:', e.message);
  }
}

listModels();
