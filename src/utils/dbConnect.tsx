import mongoose from "mongoose";

// Define an interface for the cached connection
interface MongooseCache {
  conn: typeof mongoose | null; // Cached mongoose connection
  promise: Promise<typeof mongoose> | null; // Cached promise for connecting
}

// Declare a global extension for TypeScript, defining a global `mongoose` cache object
declare global {
  var mongoose: MongooseCache | undefined; // Replaced `var` with `let`
}

// Define MongoDB connection string from the environment variable
const MONGODB_URI: string = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Initialize cached connection
let cached: MongooseCache = global.mongoose || { conn: null, promise: null }; // Changed `let` to `const` for `cached` to indicate that this reference will not be reassigned

// Ensure `global.mongoose` is set so that it's available across module reloads
if (!global.mongoose) {
  global.mongoose = cached;
}

// Main function to handle the mongoose connection
async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    // If there is an existing connection, use it
    return cached.conn;
  }

  if (!cached.promise) {
    // If no existing connection promise, create a new connection
    const opts = {
      bufferCommands: false, // Disables mongoose buffering commands until the connection is established
    };

    // Set the connection promise and assign it to the cached promise
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  // Wait for the promise to resolve and store the connection in `cached.conn`
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
