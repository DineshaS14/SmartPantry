import type { NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import Item from '../../../../models/itemModel';
import { authenticate, AuthenticatedRequest } from '../../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  // Connect to the database
  await dbConnect();

  // Authenticate the request
  await authenticate(req, res, async () => {
    if (method === 'DELETE') {
      try {
        // Ensure the item belongs to the authenticated user
        const item = await Item.findOneAndDelete({ _id: id, owner: req.user?.userId });

        if (!item) {
          return res.status(404).json({ success: false, message: 'Item not found or unauthorized' });
        }

        return res.status(200).json({ success: true, message: 'Item successfully deleted' });
      } catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).json({ success: false, message: 'Failed to delete item' });
      }
    } else {
      res.setHeader('Allow', ['DELETE']);
      return res.status(405).json({ success: false, message: `Method ${method} not allowed.` });
    }
  });
}
