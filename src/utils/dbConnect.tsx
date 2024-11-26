import mongoose from 'mongoose';

// Fetching the MongoDB URI from environment variables
const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Interface for our mongoose cache
interface MongooseCache {
  conn: typeof mongoose | null; // Cached mongoose connection
  promise: Promise<typeof mongoose> | null; // Cached promise for connecting
}

// Declare a global variable to hold our mongoose cache
declare global {
  // Prevent multiple instances of mongoose connection in development
  // It’s stored in the global object to be reused between module reloads
  var mongoose: MongooseCache | undefined;
}

// Initialize or reuse the global cache
let cached: MongooseCache = global.mongoose || { conn: null, promise: null }; // Ensure `cached` is always initialized

// Assign `cached` back to `global.mongoose` to make sure it's available across hot-reloads
global.mongoose = cached;

// Main function to handle the mongoose connection
async function dbConnect() {
  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Create a promise to connect to MongoDB and assign it to `cached.promise`
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((error: any) => {
      console.error(`MongoDB connection error with URI ${MONGODB_URI}:`, error);
      throw error; // Throw the error so it doesn't silently fail
    });
  }

  // Wait for the promise to resolve, and store the connection in `cached.conn`
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
