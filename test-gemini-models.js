const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key || '');

async function run() {
  try {
    // We cannot easily list models with the JS SDK if there's no native method exposed in this older SDK version, 
    // but let's try the raw REST API.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.Gemini_API_Key}`);
    const data = await response.json();
    console.log("Available models:");
    data.models.forEach(m => console.log(m.name, m.supportedGenerationMethods));
  } catch (err) {
    console.error('Error listing models:', err);
  }
}
run();
