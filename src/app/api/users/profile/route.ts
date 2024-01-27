import { NextResponse } from 'next/server';

export async function GET (): Promise<NextResponse> {
  const response = NextResponse.json([], { status: 200 });
  return response;
}
