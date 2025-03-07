import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET all movies & POST a new movie
export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db("chatui");

    const messages = await db.collection("chats").find({})
      .sort({ metacritic: -1 })
      .toArray();

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await connectToDatabase();
    const db = client.db("chatui");

    const { message, sender, receiver, timestamp } = await req.json();

    if (!message || !sender || !receiver || !timestamp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db.collection("chat-messages").insertOne({
      message,
      sender,
      receiver,
      timestamp
    });

    return NextResponse.json({ message: "Message added", message: result.ops[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add message" }, { status: 500 });
  }
}