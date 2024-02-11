import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Invalid MongoDB URI");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo;

  if (!globalWithMongo) {
    globalWithMongo = {};
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function database(req, res, next) {
  if (!globalWithMongo) {
    throw new Error("Global MongoDB client is not set");
  }

  try {
    req.dbClient = globalWithMongo._mongoClientPromise;
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }

  return next();
}
