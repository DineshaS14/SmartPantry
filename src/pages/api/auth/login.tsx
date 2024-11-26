import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User'; // Adjust the import path as needed
import dbConnect from '../../../utils/dbConnect';

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    username: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  const { method } = req;

  // Connect to the database
  await dbConnect();

  switch (method) {
    case 'POST': {
      try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: 'Please provide both email and password',
          });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
          });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            username: user.username,
          },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '1h' }
        );

        // Return success response, token, and user info
        return res.status(200).json({
          success: true,
          token,
          user: {
            id: user._id.toString(),
            username: user.username,
          },
        });
      } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
          success: false,
          message: 'Internal server error. Please try again later.',
        });
      }
    }

    // Handle unsupported HTTP methods
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({
        success: false,
        message: `Method ${method} not allowed`,
      });
  }
}
