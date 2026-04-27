import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('technicalRadar');
    const stack = await db.collection('userStack').findOne({ id: 'current_user' });
    return NextResponse.json(stack || { items: [] });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch stack' }, { status: 500 });
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
    console.error(e);
    return NextResponse.json({ error: 'Failed to update stack' }, { status: 500 });
  }
}
