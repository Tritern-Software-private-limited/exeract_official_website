const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_COLLECTION = process.env.ADMIN_COLLECTION;

let cachedClient = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }
  const client = new MongoClient(MONGODB_URI, {});
  await client.connect();
  cachedClient = client;
  return client;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  if (!JWT_SECRET) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Server misconfigured" }),
    };
  }

  let payload = null;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    payload = null;
  }

  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const password = typeof payload?.password === "string" ? payload.password : "";

  if (!email || !password) {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Email and password required" }),
    };
  }

  try {
    const client = await getClient();
    const db = client.db(MONGODB_DB);
    const admins = db.collection(ADMIN_COLLECTION);
    const admin = await admins.findOne({ email });

    if (!admin || !admin.passwordHash) {
      return {
        statusCode: 401,
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Invalid credentials" }),
      };
    }

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return {
        statusCode: 401,
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Invalid credentials" }),
      };
    }

    const token = jwt.sign(
      { sub: admin._id?.toString?.() || email, email, role: "admin" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      statusCode: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Login failed" }),
    };
  }
};
