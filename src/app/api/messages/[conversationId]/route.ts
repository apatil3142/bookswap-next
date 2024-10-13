import { connectToDb } from "@/lib/db";
import { Message } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request: Request, {params}: {params: {conversationId: string}}) => {
  const {conversationId} = params;
  try {
    connectToDb();
    const messages = await Message.find({
      conversationId: conversationId
    })
    return NextResponse.json(messages);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch conversation!");
  }
}