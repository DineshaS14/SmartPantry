import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IItem extends Document {
  title: string;
  quantity: number;
  url?: string;
  description?: string;
  type?: string;
  expiryDate: string;
  owner: mongoose.Types.ObjectId; // Reference to the user who owns this item
  createdAt: Date; // Automatically generated timestamp when the item is created
  updatedAt: Date; // Automatically updated timestamp when the item is updated

}

const ItemSchema = new Schema<IItem>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the item'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide the quantity of the item'],
      min: [1, 'Quantity must be at least 1'],
    },
    url: {
        type: String,
        trim: true,
        // Optionally remove validation altogether to avoid errors
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    expiryDate: {
      type: String,
      required: [true, 'Please provide an expiry date for the item'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);

export default Item;
