import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Dummy admin logic
    if (email === 'admin@admin.com' && password === 'devki100x') {
      const token = jwt.sign(
        { userId: 'admin-dummy-id', email: 'admin@admin.com', role: 'admin', name: 'Admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      const response = NextResponse.json({ 
        message: 'Login successful', 
        user: { id: 'admin-dummy-id', name: 'Admin', email: 'admin@admin.com', role: 'admin' } 
      });
      response.cookies.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return response;
    }

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create session token for normal user
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({ 
      message: 'Login successful', 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
