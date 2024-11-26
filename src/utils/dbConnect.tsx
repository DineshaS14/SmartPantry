import mongoose from 'mongoose';

// Fetching the MongoDB URI from environment variables
const MONGODB_URI: string = process.env.MONGODB_URI ?? '';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Interface for our mongoose cache
interface MongooseCache {
  conn: typeof mongoose | null; // Cached mongoose connection
  promise: Promise<typeof mongoose> | null; // Cached promise for connecting to the database
}

// Declare a global interface to prevent multiple instances of mongoose connection
interface GlobalWithMongoose extends globalThis {
  mongoose?: MongooseCache;
}

// Get the global object with TypeScript type safety
const globalWithMongoose = global as GlobalWithMongoose;

// Initialize or reuse the global cache
const cached: MongooseCache = globalWithMongoose.mongoose || { 
  conn: null, 
  promise: null 
};

// Assign `cached` back to `global.mongoose` to ensure it's available across hot-reloads
globalWithMongoose.mongoose = cached;

// Main function to handle the mongoose connection
async function dbConnect(): Promise<typeof mongoose> {
  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Set bufferCommands to false to disable buffering for all collections
    };

    // Create a promise to connect to MongoDB and assign it to `cached.promise`
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance; // When connection is successful, return the mongoose instance
      })
      .catch((error: unknown) => {
        console.error(`MongoDB connection error with URI ${MONGODB_URI}:`, error);
        throw error; // Throw the error so it doesn't silently fail
      });
  }

  // Wait for the promise to resolve, and store the connection in `cached.conn`
  cached.conn = await cached.promise;
  return cached.conn; // Return the established mongoose connection
}

export default dbConnect;