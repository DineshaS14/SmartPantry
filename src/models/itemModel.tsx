import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for an Item document
export interface IItem extends Document {
  title: string; // Name of the item (mandatory)
  quantity: number; // Quantity of the item (mandatory)
  url?: string; // Optional URL for an image or resource about the item
  description?: string; // Optional description of the item
  type?: string; // Optional type/category of the item
  expiryDate: string; // Expiration date of the item as a string (mandatory)
}

// Define the schema for the Item collection
const ItemSchema = new mongoose.Schema<IItem>({
  // Title field
  title: {
    type: String, // Data type is String
    required: [true, 'Please provide a title for the item'], // Field is mandatory
    trim: true, // Removes leading and trailing whitespace
  },
  // Quantity field
  quantity: {
    type: Number, // Data type is Number
    required: [true, 'Please provide the quantity of the item'], // Field is mandatory
    min: [1, 'Quantity must be at least 1'], // Minimum value is 1
  },
  // URL field (optional)
  url: {
    type: String, // Data type is String
    match: [
      /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*\/?$/, // Regex for valid URLs
      'Please provide a valid URL',
    ],
  },
  // Description field (optional)
  description: {
    type: String, // Data type is String
    trim: true, // Removes leading and trailing whitespace
  },
  // Type field (optional)
  type: {
    type: String, // Data type is String
    trim: true, // Removes leading and trailing whitespace
  },
  // Expiry Date field
  expiryDate: {
    type: String, // Data type is String
    required: [true, 'Please provide an expiry date for the item'], // Field is mandatory
  },
});

// Prevent model recompilation errors in development
const Item: Model<IItem> =
  mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);

export default Item;
