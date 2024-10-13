import { connectToDb } from "@/lib/db";
import { Message } from "@/lib/models";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  try {
    connectToDb();
    const message = new Message(body)
    const newMessage = await message.save();
    return NextResponse.json(newMessage);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to save message!");
  }
}