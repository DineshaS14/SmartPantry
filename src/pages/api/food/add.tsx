import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import FoodItem from '../../../models/FoodItem';
import { authenticate, AuthenticatedRequest } from '../../../middleware/auth';

interface AddFoodRequest extends AuthenticatedRequest {
  body: {
    title: string;
    imgSrc: string;
  };
}

export default async function handler(
  req: AddFoodRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  // Authenticate the request
  if (!authenticate(req, res)) return;

  switch (method) {
    case 'POST':
      try {
        const { title, imgSrc } = req.body;

        const newFoodItem = new FoodItem({
          title,
          imgSrc,
          addedBy: req.user?.userId, // Access the user ID from the authenticated request
        });

        await newFoodItem.save();

        res.status(201).json({ success: true, data: newFoodItem });
      } catch (error: any) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
      break;
  }
}
