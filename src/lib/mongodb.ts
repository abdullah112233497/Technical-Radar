import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.DataBase_URL) {
  throw new Error('Invalid/Missing environment variable: "DataBase_URL"');
}

const uri = process.env.DataBase_URL;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

function createClientPromise() {
  client = new MongoClient(uri, options);
  return client.connect();
}

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = createClientPromise();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export default clientPromise;

export async function getDb() {
  try {
    const client = await clientPromise;
    return client.db('technicalRadar');
  } catch (e) {
    console.error('Initial MongoDB connection failed, retrying once...', e);
    // If initial connection failed, try to create a new one
    const newClient = new MongoClient(uri, options);
    const connectedClient = await newClient.connect();
    return connectedClient.db('technicalRadar');
  }
}
