import mongoose from 'mongoose';

declare global {
  interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  }

  var mongoose: MongooseCache | undefined;
}

export {};