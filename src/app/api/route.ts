import { NextResponse } from "next/server";
import * as xml2js from "xml2js";
import nodemailer from "nodemailer";

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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({
      error: "Name, email, and message are required",
      code: 400,
    });
  }

  const mailOptions = {
    from: "shukladitya9@gmail.com",
    to: "hi@adity.me",
    subject: `New message from ${name}`,
    text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return NextResponse.json({ message: "Email sent successfully", code: 200 });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    return NextResponse.json({ error: "Something went wrong", code: 500 });
  }
}
