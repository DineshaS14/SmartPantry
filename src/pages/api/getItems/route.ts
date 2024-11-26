import type { NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Item from '../../../models/itemModel';
import { authenticate, AuthenticatedRequest } from '../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { method } = req;

  // Connect to the database
  await dbConnect();

  authenticate(req, res, async () => {
    switch (method) {
      case 'GET':
        try {
          // Fetch items belonging to the authenticated user
          const items = await Item.find({ owner: req.user?.userId })
            .select('title quantity url description type expiryDate'); // Only select the required fields

          res.status(200).json({ success: true, items });
        } catch (error) {
          console.error('Error fetching items:', error);
          res.status(500).json({ success: false, message: 'Failed to fetch items' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, message: `Method ${method} not allowed.` });
    }
  });
}
