import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set('auth_token', '', { maxAge: -1, path: '/' });
  return response;
}
