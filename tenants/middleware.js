import { NextResponse } from 'next/server';
import { get, getAll } from '@vercel/edge-config';

export const config = {
  runtime: 'edge',
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
  const hostname = req.headers.get('host') || 'ieportals.com';

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname
        .replace(`.ieportals.com`, '')
        .replace(`.platformize.vercel.app`, '')
      : hostname.replace(`.localhost:3000`, '');


  req.tenant = currentHost;

  // rewrite root application to `/home` folder
  if (currentHost === 'www' || currentHost === 'ieportals.com' || currentHost === 'localhost:3000' || currentHost === 'platformize.vercel.app') {
    console.log(req.tenant)

    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite console application to `/console` folder
  if (currentHost === 'console' || currentHost === 'console.ieportals.com' || currentHost === 'console.localhost:3000') {
    url.pathname = `/console${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // TODO - add more rules here.
  // rewrite everything else to `/_tenants/[tenant] dynamic route
  url.pathname = `/_tenants/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);
}