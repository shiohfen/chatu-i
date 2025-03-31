import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET all movies & POST a new movie
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const receiverId = searchParams.get("receiverId");
  const senderId = searchParams.get("senderId");

  try {
    const client = await connectToDatabase();
    const db = client.db("chatui");

    const messages = await db.collection("chat-messages").find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).toArray();

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req) {
    try {
        const client = await connectToDatabase();
        const db = client.db("chatui");
        const { message, sender, receiver } = await req.json();

        if (!message || !sender || !receiver) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const result = await db.collection("chat-messages").insertOne({
            message,
            sender,
            receiver,
            timestamp: new Date(),
        });

        return NextResponse.json({ message: "Message added" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add message" }, { status: 500 });
    }
}