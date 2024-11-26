import mongoose from 'mongoose';

declare global {
  interface CustomGlobal {
    mongoose?: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
  }
}

export {};