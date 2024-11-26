import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Item from '../../../models/itemModel'; // Use the Item model for saving items
import { authenticate, AuthenticatedRequest } from '../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { method } = req;

  // Connect to the database
  await dbConnect();

  // Authenticate the request
  authenticate(req, res, async () => {
    switch (method) {
      case 'POST': {
        try {
          const { title, quantity, url, description, type, expiryDate, owner } = req.body;
          console.log('URL received:', url); // Log the URL to verify its value

          // Validate required fields
          if (!title || !quantity || !expiryDate) {
            return res.status(400).json({
              success: false,
              message: 'Title, quantity, and expiry date are required.',
            });
          }

          // Create a new item associated with the authenticated user
          if (!owner) {
            return res.status(401).json({ success: false, message: 'Owner ID is required' });
          }

          const newItem = new Item({
            title,
            quantity,
            url,
            description,
            type,
            expiryDate,
            owner, // Set owner to the logged-in user ID
          });

          // Save the new item to the database
          await newItem.save();

          res.status(201).json({
            success: true,
            data: {
              item: {
                id: newItem._id,
                title: newItem.title,
                quantity: newItem.quantity,
                url: newItem.url,
                description: newItem.description,
                type: newItem.type,
                expiryDate: newItem.expiryDate,
                owner: newItem.owner,
                createdAt: newItem.createdAt,
                updatedAt: newItem.updatedAt,
              },
            },
          });
        } catch (error) {
          console.error('Error adding item:', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
        }
        break;
      }

      default:
        // Handle unsupported methods
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ success: false, message: `Method ${method} not allowed.` });
    }
  });
}
