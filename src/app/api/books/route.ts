import { Book } from "@/lib/models";
import { connectToDb } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const books = await Book.find().populate('postedBy', '_id name').sort('-createdAt');;
    return NextResponse.json(books);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch books!");
  }
};