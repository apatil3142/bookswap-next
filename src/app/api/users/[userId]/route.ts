import { connectToDb } from "@/lib/db";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request: Request, {params}: {params: {userId: string}}) => {
  const {userId} = params;
  try {
    connectToDb();
    const user = await User.findById(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, updatedAt, ...other } = user._doc;
    return NextResponse.json(other);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch User!");
  }
}