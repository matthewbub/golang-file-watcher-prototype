import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)'
  ]
};

export default function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || 'demo.windmill.ooo';

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname
        .replace(`.9mbs.studio`, '')
        .replace(`.platformize.vercel.app`, '')
      : hostname.replace(`.localhost:3000`, '');

  // rewrites for app pages
  if (currentHost == 'app') {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite root application to `/home` folder
  if (hostname === 'localhost:3000') {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite admin application to `/admin` folder
  if (hostname === 'admin.localhost:3000') {
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // TODO - add more rules here.
  // rewrite everything else to `/_tenants/[tenant] dynamic route
  url.pathname = `/_tenants/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);
}