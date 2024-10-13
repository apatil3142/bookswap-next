import { connectToDb } from "@/lib/db";
import { Book } from "@/lib/models";
import { NextResponse } from "next/server";


export const GET = async (request: Request, {params}: {params: {bookId: string}}) => {
  const {bookId} = params;
  try {
    connectToDb();
    const book = await Book.findById(bookId).populate('postedBy', '_id name');
    return NextResponse.json(book);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch books!");
  }
}