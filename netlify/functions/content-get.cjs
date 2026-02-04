const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const CONTENT_COLLECTION = process.env.CONTENT_COLLECTION;

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
    const collection = db.collection(CONTENT_COLLECTION);
    const doc = await collection.findOne({ _id: "landing" });
    if (!doc) {
      return {
        statusCode: 404,
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Content not found" }),
      };
    }
    const { _id, createdAt, updatedAt, ...content } = doc;
    return {
      statusCode: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Failed to load content" }),
    };
  }
};
