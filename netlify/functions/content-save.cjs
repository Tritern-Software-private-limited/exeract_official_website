const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const CONTENT_COLLECTION = process.env.CONTENT_COLLECTION;
const JWT_SECRET = process.env.JWT_SECRET;

let cachedClient = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
  if (!MONGODB_DB) throw new Error("Missing MONGODB_DB");
  if (!CONTENT_COLLECTION) throw new Error("Missing CONTENT_COLLECTION");
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
  });
  await client.connect();
  cachedClient = client;
  return client;
}

function verifyAuth(event) {
  if (!JWT_SECRET) throw new Error("Missing JWT_SECRET");
  const authHeader = event.headers?.authorization || event.headers?.Authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) throw new Error("Unauthorized");
  jwt.verify(token, JWT_SECRET);
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    verifyAuth(event);
  } catch {
    return {
      statusCode: 401,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  let payload = null;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    payload = null;
  }

  const content = payload?.content;
  if (!content || typeof content !== "object") {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Invalid content" }),
    };
  }

  try {
    const client = await getClient();
    const db = client.db(MONGODB_DB);
    const collection = db.collection(CONTENT_COLLECTION);
    await collection.updateOne(
      { _id: "landing" },
      {
        $set: { ...content, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );
    return {
      statusCode: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error("content-save failed:", error);
    return {
      statusCode: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Failed to save content" }),
    };
  }
};
