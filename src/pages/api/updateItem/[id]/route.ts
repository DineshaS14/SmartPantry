// /api/updateItem/[id]/route.ts
import type { NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import Item from '../../../../models/itemModel';
import { authenticate, AuthenticatedRequest } from '../../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  // Connect to the database
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // Authenticate user
        await authenticate(req, res, async () => {
          // Find item by ID and validate ownership
          const item = await Item.findOne({ _id: id, owner: req.user?.userId });

          if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found or unauthorized' });
          }

          res.status(200).json({ success: true, item });
        });
      } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch item' });
      }
      break;

    case 'PUT':
      try {
        // Authenticate user
        await authenticate(req, res, async () => {
          const { title, quantity, url, description, type, expiryDate } = req.body;

          // Validate required fields
          if (!title || quantity == null || !expiryDate) {
            return res.status(400).json({
              success: false,
              message: 'Title, quantity, and expiry date are required fields.',
            });
          }

          // Find the item by ID and update it
          const updatedItem = await Item.findOneAndUpdate(
            { _id: id, owner: req.user?.userId },
            { title, quantity, url, description, type, expiryDate },
            { new: true, runValidators: true } // Return the updated item and run validators
          );

          if (!updatedItem) {
            return res.status(404).json({ success: false, message: 'Item not found or unauthorized' });
          }

          res.status(200).json({ success: true, item: updatedItem });
        });
      } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ success: false, message: 'Failed to update item' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).json({ success: false, message: `Method ${method} not allowed.` });
  }
}
