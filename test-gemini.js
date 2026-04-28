const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key || '');

async function run() {
  const MODELS = ['gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-2.0-flash', 'gemini-1.5-pro'];
  for (let i = 0; i < MODELS.length; i++) {
    try {
      console.log('Trying', MODELS[i]);
      const model = genAI.getGenerativeModel({ model: MODELS[i] });
      const result = await model.generateContent("hello");
      const response = await result.response;
      console.log('Success:', response.text());
      return;
    } catch (err) {
      console.error(`Error with ${MODELS[i]}:`, err.message);
    }
  }
}
run();
