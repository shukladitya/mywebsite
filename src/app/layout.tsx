"use client";
import "./globals.css";

import { Hanken_Grotesk } from "next/font/google";
import Script from "next/script";

const hanken_Grotesk = Hanken_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={hanken_Grotesk.className}>
        <div className="cursor">
          <div className="cursor__ball cursor__ball--big">
            <svg height="40" width="40">
              <circle cx="20" cy="20" r="20" stroke-width="0"></circle>
            </svg>
          </div>
          <div className="cursor__ball cursor__ball--small">
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="4" stroke-width="0"></circle>
            </svg>
          </div>
          {children}
        </div>
      </body>
      <Script defer src="./mouseScript.js" />

      <Script src="./nameSandScript.js" />
    </html>
  );
}
