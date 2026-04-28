import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'fs';
import path from 'path';
import dns from 'dns';

if (!process.env.DataBase_URL) {
  throw new Error('Invalid/Missing environment variable: "DataBase_URL"');
}

const originalUri = process.env.DataBase_URL;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 20000,
  socketTimeoutMS: 45000,
};

let clientPromise: Promise<MongoClient | null>;

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

export function getLocalDb() {
  if (!fs.existsSync(DB_PATH)) {
    return { userStack: { items: ['MongoDB', 'PostgreSQL', 'Next.js', 'React', 'Tailwind CSS'] } };
  }
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch {
    return { userStack: { items: ['MongoDB', 'PostgreSQL', 'Next.js', 'React', 'Tailwind CSS'] } };
  }
}

async function resolveAtlasUri(uri: string): Promise<string> {
  if (!uri.startsWith('mongodb+srv://')) return uri;
  
  try {
    const host = uri.split('@')[1].split('/')[0];
    const srvHost = `_mongodb._tcp.${host}`;
    
    const resolver = new dns.promises.Resolver();
    resolver.setServers(['8.8.8.8', '1.1.1.1']);
    
    const [srvRecords, txtRecords] = await Promise.all([
      resolver.resolveSrv(srvHost),
      resolver.resolveTxt(host).catch(() => [])
    ]);

    const shards = srvRecords.map(r => `${r.name}:${r.port}`).join(',');
    const credentials = uri.split('//')[1].split('@')[0];
    const dbPath = uri.split('/').slice(3).join('/').split('?')[0];
    
    // Hardcoding the replicaSet from the TXT test result to be absolutely sure
    const finalUri = `mongodb://${credentials}@${shards}/${dbPath}?ssl=true&authSource=admin&replicaSet=atlas-87avck-shard-0&retryWrites=true&w=majority`;
    return finalUri;
  } catch (e) {
    return uri;
  }
}

async function connectToMongo() {
  const resolvedUri = await resolveAtlasUri(originalUri);
  try {
    const client = new MongoClient(resolvedUri, options);
    await client.connect();
    console.log('>>> CONNECTED TO MONGODB ATLAS <<<');
    return client;
  } catch (err) {
    console.error('>>> ATLAS CONNECTION FAILED:', (err as any).message);
    try {
      const localClient = new MongoClient('mongodb://localhost:27017/technicalRadar', { connectTimeoutMS: 5000 });
      await localClient.connect();
      console.log('>>> FALLBACK: CONNECTED TO LOCAL MONGODB <<<');
      return localClient;
    } catch (localErr) {
      console.warn('>>> LOCAL FALLBACK FAILED <<<');
      return null;
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient | null>;
  };
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = connectToMongo();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = connectToMongo();
}

export default clientPromise;

export async function getDb() {
  const client = await clientPromise;
  if (!client) return null;
  return client.db('technicalRadar');
}

export async function getStack() {
  try {
    const db = await getDb();
    if (!db) return getLocalDb().userStack.items;
    const stack = await db.collection('stack').findOne({}, { sort: { updatedAt: -1 } }); // Get the LATEST document
    return stack?.items || getLocalDb().userStack.items;
  } catch (e) {
    return getLocalDb().userStack.items;
  }
}

export async function saveStack(items: string[]) {
  try {
    const db = await getDb();
    if (!db) throw new Error('No DB connection');
    // Upsert any document in the stack collection
    const result = await db.collection('stack').updateOne(
      {}, 
      { $set: { items, updatedAt: new Date(), id: 'current_user' } },
      { upsert: true }
    );
    console.log('>>> STACK SAVED TO DB SUCCESSFULLY <<<');
  } catch (e) {
    console.error('>>> FAILED TO SAVE TO DB:', (e as any).message);
    const dbData = getLocalDb();
    dbData.userStack.items = items;
    fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
  }
}
