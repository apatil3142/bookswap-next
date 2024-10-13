import { connectToDb } from "@/lib/db";
import { Conversation } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request: Request, {params}: {params: {userId: string}}) => {
  const {userId} = params;
  try {
    connectToDb();
    const conversation = await Conversation.find({
      members: {$in: [userId]},
    })
    return NextResponse.json(conversation);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch conversation!");
  }
}