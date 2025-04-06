import OpenAI from "openai";
import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv';

dotenv.config();
console.log("freeze:", process.env.FREEZE);
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


export async function GET() {
  const response = await client.responses.create({
      model: "gpt-4o",
      input: [
        {role: "user", content: "Give me an idea for a woodworking project."},
        {role: "assistant", content: "How about a wooden elephant?"},
        {role: "user", content: "Tell me a story if that project magically came to life."},
      ]
  });
  return NextResponse.json({ story: response});
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