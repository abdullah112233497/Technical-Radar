const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.DataBase_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  family: 4,
  connectTimeoutMS: 30000
});

async function run() {
  try {
    console.log('Connecting to MongoDB Atlas with family: 4...');
    await client.connect();
    console.log('Connected!');
    const db = client.db('technicalRadar');
    const collection = db.collection('stack');
    
    const result = await collection.updateOne(
      { id: 'current_user' },
      { $set: { items: ['Test Item'], updatedAt: new Date() } },
      { upsert: true }
    );
    
    console.log('Update result:', result);
    const doc = await collection.findOne({ id: 'current_user' });
    console.log('Found doc:', doc);
    
  } catch (err) {
    console.error('Error details:', err.message);
  } finally {
    await client.close();
  }
}
run();
