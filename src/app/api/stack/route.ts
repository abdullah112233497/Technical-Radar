import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('technicalRadar');
    const stack = await db.collection('userStack').findOne({ id: 'current_user' });
    return NextResponse.json(stack || { items: [] });
  } catch (e) {
    console.error('Stack GET error:', e);
    // Return empty items instead of 500 to allow UI to function
    return NextResponse.json({ items: [], warning: 'DB connection unavailable' });
  }
}

export async function POST(request: Request) {
  try {
    const { items } = await request.json();
    const client = await clientPromise;
    const db = client.db('technicalRadar');
    await db.collection('userStack').updateOne(
      { id: 'current_user' },
      { $set: { items, updatedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ message: 'Stack updated successfully' });
  } catch (e) {
    console.error('Stack POST error:', e);
    return NextResponse.json({ error: 'Failed to update stack. Database connection issue.' }, { status: 503 });
  }
}
