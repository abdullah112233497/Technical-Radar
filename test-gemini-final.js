const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key || '');

async function run() {
  const MODELS = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3-flash-preview'];
  for (let i = 0; i < MODELS.length; i++) {
    try {
      console.log('Trying', MODELS[i]);
      const model = genAI.getGenerativeModel({ model: MODELS[i] });
      const result = await model.generateContent("hello");
      const response = await result.response;
      console.log('Success with', MODELS[i], ':', response.text());
      return;
    } catch (err) {
      console.error(`Error with ${MODELS[i]}:`, err.message);
    }
  }
}
run();
