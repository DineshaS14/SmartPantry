import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for a User document
export interface IUser extends Document {
  username: string; // User's unique username
  email: string; // User's email address
  password: string; // Hashed password
  items: mongoose.Types.ObjectId[]; // Array of references to Item documents
  createdAt: Date; // Timestamp when the document was created
  updatedAt: Date; // Timestamp when the document was last updated
}

// Define the schema for the User collection
const UserSchema = new mongoose.Schema<IUser>(
  {
    // Username field
    username: {
      type: String, // Data type is String
      required: [true, 'Please provide a username'], // Field is required
      unique: true, // Username must be unique
      trim: true, // Removes leading and trailing whitespace
    },
    // Email field
    email: {
      type: String, // Data type is String
      required: [true, 'Please provide an email'], // Field is required
      unique: true, // Email must be unique
      lowercase: true, // Converts the email to lowercase
      match: [
        // Regex to validate email format
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    // Password field
    password: {
      type: String, // Data type is String
      required: [true, 'Please provide a password'], // Field is required
      minlength: [6, 'Password must be at least 6 characters'], // Minimum password length
    },
    // Items field
    items: [
      {
        type: Schema.Types.ObjectId, // References an Item document
        ref: 'Item', // Reference the 'Item' collection
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Prevent model recompilation errors in development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
