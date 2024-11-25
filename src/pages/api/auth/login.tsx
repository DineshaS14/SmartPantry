import type { NextApiRequest, NextApiResponse } from 'next'; // TypeScript types for API request and response objects
import bcrypt from 'bcryptjs'; // Library for hashing and comparing passwords
import jwt from 'jsonwebtoken'; // Library for generating and verifying JSON Web Tokens
import User from '../../../models/User'; // Mongoose User model for interacting with the users collection in the database
import dbConnect from '../../../utils/dbConnect'; // Utility function to connect to the database
import * as cookie from 'cookie'; // Library to parse and serialize cookies

// Extend the NextApiRequest type to include the email and password fields in the request body
interface LoginRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

// Main handler function for the login API
export default async function handler(
  req: LoginRequest,
  res: NextApiResponse
) {
  const { method } = req; // Extract the HTTP method from the request

  // Ensure a connection to the database is established
  await dbConnect();

  // Handle different HTTP methods
  switch (method) {
    case 'POST': // Only handle POST requests for login
      try {
        const { email, password } = req.body; // Extract email and password from the request body

        // Validate the input
        if (!email || !password) {
          // If email or password is missing, respond with a 400 Bad Request status
          return res
            .status(400)
            .json({ success: false, message: 'Email and password are required' });
        }

        // Check if the user exists in the database
        const user = await User.findOne({ email }); // Query the database for a user with the provided email
        if (!user) {
          // If no user is found, respond with a 404 Not Found status
          return res
            .status(404)
            .json({ success: false, message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          // If the passwords don't match, respond with a 401 Unauthorized status
          return res
            .status(401)
            .json({ success: false, message: 'Invalid email or password' });
        }

        // Generate a JSON Web Token (JWT) with the user's ID and email
        const token = jwt.sign(
          { userId: user._id, email: user.email }, // Payload of the token
          process.env.JWT_SECRET || 'secret', // Secret key to sign the token (use an environment variable in production)
          { expiresIn: '1h' } // Set the token to expire in 1 hour
        );

        // Set the token in an HTTP-only cookie
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', token, {
            httpOnly: true, // The cookie cannot be accessed by JavaScript (for security)
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (requires HTTPS)
            maxAge: 3600, // Set the cookie to expire in 1 hour
            sameSite: 'strict', // Restrict the cookie to the same site for CSRF protection
            path: '/', // Make the cookie accessible to all paths
          })
        );

        // Respond with a success status and user data (excluding sensitive fields like the password)
        return res.status(200).json({
          success: true,
          data: {
            user: {
              id: user._id, // User ID
              username: user.username, // User's username
              email: user.email, // User's email
            },
          },
        });
      } catch (error: any) {
        // Handle any unexpected errors that occur during the process
        console.error('Error during login:', error);
        return res.status(500).json({
          success: false,
          message: 'An error occurred during login', // General error message for internal server errors
        });
      }

    default:
      // Handle unsupported HTTP methods
      res.setHeader('Allow', ['POST']); // Inform the client that only POST is allowed
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} not allowed` }); // Respond with a 405 Method Not Allowed status
  }
}
