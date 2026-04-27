const { MongoClient } = require('mongodb');

// Using the direct shard addresses found via Google DNS to bypass local DNS SRV issues
const uri = "mongodb://abdullahqaisar405:Abd87654321@ac-8xghd5g-shard-00-00.h9rrvaw.mongodb.net:27017,ac-8xghd5g-shard-00-01.h9rrvaw.mongodb.net:27017,ac-8xghd5g-shard-00-02.h9rrvaw.mongodb.net:27017/technicalRadar?replicaSet=atlas-h9rrvaw-shard-0&ssl=true&authSource=admin";

const client = new MongoClient(uri, {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
});

async function run() {
  try {
    console.log('Connecting to MongoDB Atlas (Direct Shard Access)...');
    await client.connect();
    console.log('Connected!');
    const db = client.db('technicalRadar');
    const collection = db.collection('stack');
    
    const result = await collection.updateOne(
      { id: 'current_user' },
      { $set: { items: ['Direct Connect Test'], updatedAt: new Date() } },
      { upsert: true }
    );
    
    console.log('Update result:', result);
    const doc = await collection.findOne({ id: 'current_user' });
    console.log('Found doc:', doc);
    
  } catch (err) {
    console.error('Connection failed:', err.message);
  } finally {
    await client.close();
  }
}
run();
