import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: NextApiResponse
): boolean => {
  const token = req.cookies?.token; // Ensure the token exists
  if (!token) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return false;
  }

  try {
    // Decode the token and attach user info to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      userId: string;
    };
    req.user = { userId: decoded.userId };
    return true;
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
    return false;
  }
};
