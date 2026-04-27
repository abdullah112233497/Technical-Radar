const { MongoClient } = require('mongodb');

// Using the direct IPs found via netstat and ping
const uri = "mongodb://abdullahqaisar405:Abd87654321@159.41.171.14:27017,159.41.171.51:27017,159.41.171.28:27017/technicalRadar?replicaSet=atlas-h9rrvaw-shard-0&ssl=true&authSource=admin";

const client = new MongoClient(uri, {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
});

async function run() {
  try {
    console.log('Connecting to MongoDB Atlas (Direct IP Access)...');
    await client.connect();
    console.log('Connected!');
    const db = client.db('technicalRadar');
    const collection = db.collection('stack');
    
    const result = await collection.updateOne(
      { id: 'current_user' },
      { $set: { items: ['Direct IP Connect Test'], updatedAt: new Date() } },
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
