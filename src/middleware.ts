import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const html = `<!DOCTYPE html>
<html lang="en">
<body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
  <div>
    <h1>Hello, this small part of the internet belongs to me! ¯\\_(ツ)_/¯</h1>
    
    <p>
      <a href="https://www.linkedin.com/in/adityashk/" target="_blank">LinkedIn</a> | 
      <a href="https://x.com/hi_adty" target="_blank">Twitter</a> | 
      <a href="https://drive.google.com/file/d/1xmnq4SV2X6tE4HU_7SZCjAS745DFoxvS/view?usp=sharing" target="_blank">Resume</a>
    </p>
    
    <h2>Interesting things worth checking out:</h2>
    <ul>
      <li><a href="https://www.ariapp.co/" target="_blank">Ari</a></li>
      <li><a href="https://practick.io/" target="_blank">Practick.io</a></li>
      <li><a href="https://shukladitya.github.io/game-of-life/" target="_blank">Game of Life</a></li>
    </ul>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
