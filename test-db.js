const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.DataBase_URL;
  if (!uri) {
    console.error('No DataBase_URL found in environment');
    return;
  }
  console.log('Connecting to:', uri.split('@')[1]); 
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db('technicalRadar');
    const collection = db.collection('userStack');
    const result = await collection.findOne({ id: 'current_user' });
    console.log('Current stack in DB:', result);
  } catch (e) {
    console.error('Connection failed:', e);
  } finally {
    await client.close();
  }
}

testConnection();
