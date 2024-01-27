import { type NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware (request: NextRequest): Promise<NextResponse | undefined> {
  const pathname = request.nextUrl.pathname;
  const authenticatedAPIRoutes = [
    pathname.startsWith('/api/users')
  ];

  if (authenticatedAPIRoutes.includes(true)) {
    const cookie = request.cookies.get('jwt-token');
    if (!cookie?.value) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }
    const token = cookie.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      await jwtVerify(token, secret);
    } catch (error) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }
  }
}

export const config = {
  matcher: '/:path*'
};
