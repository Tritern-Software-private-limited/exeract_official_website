const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const POSTS_COLLECTION = process.env.POSTS_COLLECTION;

let cachedClient = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
  const client = new MongoClient(MONGODB_URI, {});
  await client.connect();
  cachedClient = client;
  return client;
}

exports.handler = async () => {
  try {
    const client = await getClient();
    const db = client.db(MONGODB_DB);
    const collection = db.collection(POSTS_COLLECTION);
    const posts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    const clean = posts.map(({ _id, createdAt, updatedAt, ...rest }) => rest);
    return {
      statusCode: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ posts: clean }),
    };
  } catch {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Failed to load posts" }),
    };
  }
};
