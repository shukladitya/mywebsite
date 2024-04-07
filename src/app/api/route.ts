import { NextResponse } from "next/server";
import * as xml2js from "xml2js";

export async function GET() {
  try {
    const res = await fetch("https://medium.com/feed/@itsaurelius", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const xmlData = await res.text();

    const parser = new xml2js.Parser();
    let jsonData;

    parser.parseString(xmlData, (err: any, result: any) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return NextResponse.error();
      }

      jsonData = result;
    });

    return NextResponse.json({ jsonData });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
