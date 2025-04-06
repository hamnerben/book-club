import OpenAI from "openai";
import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv';

dotenv.config();
console.log("freeze:", process.env.FREEZE);
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


export async function GET() {
  const response = await client.responses.create({
      model: "gpt-4o",
      input: "Write a one-sentence bedtime story."
  });
  return NextResponse.json({ story: response.output_text });
}

// recive a message from the client and return a response
export async function POST(request: Request) {
  const { message } = await request.json();
  const response = await client.responses.create({
      model: "gpt-4o",
      input: message
  });
  return NextResponse.json({ content: response.output_text });
}

// export async function GET() {
//   return NextResponse.json({ message: process.env.FREEZE });
// }