const Groq = require('groq-sdk');
require('dotenv').config({ path: '.env.local' });

const groq = new Groq({ apiKey: process.env.Groq_API_Key });

async function run() {
  try {
    console.log('Trying Groq...');
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'hello' }],
      model: 'llama-3.3-70b-versatile',
    });
    console.log('Success Groq:', chatCompletion.choices[0]?.message?.content);
  } catch (err) {
    console.error('Error with Groq:', err.message);
  }
}
run();
