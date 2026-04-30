import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let query: Record<string, unknown> = {};
    if (userId) query.userId = userId;
    if (status) query.status = status;

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const order = await Order.create(body);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Orders API create error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
