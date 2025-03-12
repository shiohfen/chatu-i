import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("MongoDB Connected");
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("MongoDB Not Connected");
  }
}
