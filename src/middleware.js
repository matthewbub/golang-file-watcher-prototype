import { NextResponse } from 'next/server';

const DOMAINS = {
  PRODUCTION: 'ieportals.com',
  VERCEL: 'platformize.vercel.app',
  LOCAL: 'localhost:3000',
  LOCAL_MATTHEW: 'matthewbub.localhost:3000',
  WWW: 'www',
  CONSOLE: 'console',
  MATTHEW: 'matthewbub.com',
  WWW_MATTHEW: 'www.matthewbub.com'
};

export const config = {
  matcher: [
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(req) {
  const url = req.nextUrl;
  let hostname = req.headers.get('host') || DOMAINS.PRODUCTION;

  if (process.env.NODE_ENV === 'production' && process.env.VERCEL === '1') {
    hostname = hostname
      .replace(`.${DOMAINS.PRODUCTION}`, '')
      .replace(`.${DOMAINS.VERCEL}`, '')
      .replace(`.${DOMAINS.MATTHEW}`, '')
      .replace(`.${DOMAINS.WWW_MATTHEW}`, '');
  } else {
    hostname = hostname.replace(`.${DOMAINS.LOCAL}`, '').replace(`.${DOMAINS.LOCAL_MATTHEW}`, '');
  }

  req.tenant = hostname;

  if (
    [DOMAINS.WWW, DOMAINS.PRODUCTION, DOMAINS.LOCAL, DOMAINS.VERCEL].includes(hostname)
  ) {
    console.log(req.tenant);

    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (
    [DOMAINS.CONSOLE, `${DOMAINS.CONSOLE}.${DOMAINS.PRODUCTION}`, `${DOMAINS.CONSOLE}.${DOMAINS.LOCAL}`].includes(hostname)
  ) {
    url.pathname = `/console${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (
    [DOMAINS.MATTHEW, DOMAINS.WWW_MATTHEW, DOMAINS.LOCAL_MATTHEW].includes(hostname)
  ) {
    url.pathname = `/_tenants/${hostname}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  url.pathname = `/_tenants/${hostname}${url.pathname}`;
  return NextResponse.rewrite(url);
}
