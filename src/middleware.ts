import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const html = `<!DOCTYPE html>
<html lang="hi">
<body style="margin:0; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 16px;">
  <div style="font-size: 1.5rem; font-weight: 500;">मेरा नाम आदित्य है! ¯\\_(ツ)_/¯</div>
  <div style="display:flex; gap: 36px; font-size: 1rem;">
    <a href="https://www.linkedin.com/in/adityashk/" target="_blank">मेरा लिंक्डइन</a>
    <a href="https://x.com/hi_adty" target="_blank">मेरा ट्विटर</a>
    <a href="https://www.ariapp.co/" target="_blank">मेरा प्रोजेक्ट</a>
    <a href="https://drive.google.com/file/d/1xmnq4SV2X6tE4HU_7SZCjAS745DFoxvS/view?usp=sharing" target="_blank">मेरा रेज़्यूमे</a>
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
