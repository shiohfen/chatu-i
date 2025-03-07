import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET all movies & POST a new movie
export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db("sample_mflix");

    const movies = await db.collection("movies").find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await connectToDatabase();
    const db = client.db("sample_mflix");

    const { title, director, year, genre } = await req.json();
    if (!title || !director || !year || !genre) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db.collection("movies").insertOne({
      title,
      director,
      year: parseInt(year, 10),
      genre
    });

    return NextResponse.json({ message: "Movie added", movie: result.ops[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add movie" }, { status: 500 });
  }
}