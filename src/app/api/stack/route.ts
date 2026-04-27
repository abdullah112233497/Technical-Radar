import { NextResponse } from 'next/server';
import { getStack, saveStack } from '@/lib/mongodb';

export async function GET() {
  try {
    const items = await getStack();
    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: Request) {
  try {
    const { items } = await request.json();
    await saveStack(items);
    return NextResponse.json({ message: 'Stack updated successfully' });
  } catch (e) {
    console.error('Stack POST error:', e);
    return NextResponse.json({ error: 'Failed to update stack' }, { status: 500 });
  }
}
