import { connectToDb } from "@/lib/db";
import { Conversation } from "@/lib/models";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  try {
    const conversation = new Conversation({
      members: [body.senderId, body.receiverId]
    })
    connectToDb();
    const savedConversation = await conversation.save();
    return NextResponse.json(savedConversation);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch conversation!");
  }
}