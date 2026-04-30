import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      await Newsletter.findByIdAndUpdate(existing._id, { subscribed: true });
      return NextResponse.json({ message: 'You are already subscribed. Thank you!' });
    }

    await Newsletter.create({ email: email.toLowerCase(), subscribed: true });
    return NextResponse.json({ message: 'Thank you for subscribing!' });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
