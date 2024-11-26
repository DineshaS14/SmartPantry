import mongoose from 'mongoose'; // Import the mongoose library to interact with MongoDB

// Fetching the MongoDB URI from environment variables
// Using TypeScript to enforce the type of MONGODB_URI as a string
const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Interface for our mongoose cache
interface MongooseCache {
  conn: typeof mongoose | null; // Cached mongoose connection, which will hold the mongoose instance or null
  promise: Promise<typeof mongoose> | null; // Cached promise for connecting to the database, which can be a promise or null
}

// Declare a global variable to hold our mongoose cache
declare global {
  // Prevent multiple instances of mongoose connection in development
  // This ensures that the connection is reused, and multiple connections are not created during hot-reloading
  var mongoose: MongooseCache | undefined;
}

// Initialize or reuse the global cache
// Use a cached object to prevent multiple connections to the database in a development environment
// If global.mongoose is already defined, we use it; otherwise, we initialize with default values
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Assign `cached` back to `global.mongoose` to ensure it's available across hot-reloads
// By attaching `cached` to `global.mongoose`, we keep the connection alive even during hot module replacements (HMR)
global.mongoose = cached;

// Main function to handle the mongoose connection
async function dbConnect(): Promise<typeof mongoose> {
  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn; // If there's already a valid connection, return it immediately
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Set bufferCommands to false to disable buffering for all collections
    };

    // Create a promise to connect to MongoDB and assign it to `cached.promise`
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance; // When connection is successful, return the mongoose instance
    }).catch((error: unknown) => { // Replace `any` with `unknown` for better type safety
      console.error(`MongoDB connection error with URI ${MONGODB_URI}:`, error);
      throw error; // Throw the error so it doesn't silently fail, which helps in error detection and handling
    });
  }

  // Wait for the promise to resolve, and store the connection in `cached.conn`
  cached.conn = await cached.promise; // Once the promise resolves, assign the connection to `cached.conn`
  return cached.conn; // Return the established mongoose connection
}

export default dbConnect; // Export the `dbConnect` function for use in other parts of the application
