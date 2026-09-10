import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Hosts that serve the cloud app; every page URL on them renders the maintenance page
// while the cloud is down. Static assets and the desktop installer stay downloadable.
const MAINTENANCE_HOSTS = new Set(["app.crablock.cloud", "app.localhost"]);

export function proxy(request: NextRequest) {
  const hostname = (request.headers.get("host") ?? "").toLowerCase().split(":")[0];

  if (MAINTENANCE_HOSTS.has(hostname)) {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|logo.svg|robots.txt|sitemap.xml|downloads/).*)",
  ],
};
