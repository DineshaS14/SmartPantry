# Smart Pantry Application

## Overview

**Smart Pantry** is a web-based application that allows users to manage their pantry inventory and generate creative recipe suggestions based on available ingredients and dietary preferences. The app features a user-friendly interface to add, search, and manage pantry items, while also using a machine learning-based API to provide personalized recipe recommendations.

### Features:
- **Inventory Management**: Add, update, and delete food items in your pantry.
- **Recipe Suggestions**: Generate recipes based on available inventory items and dietary restrictions.
- **Protected Routes**: Only logged-in users can access certain pages.

The app uses **Next.js**, **Tailwind CSS** for styling, **Groq API** for recipe suggestions, and **MongoDB** as the database.

## Prerequisites

Ensure that you have the following tools installed on your local machine:
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [MongoDB](https://www.mongodb.com/) for the database

## Installation

First, clone the repository:
```bash
$ git clone https://github.com/yourusername/smart-pantry.git
```

Navigate to the project directory:
```bash
$ cd smart-pantry
```

Install all dependencies:
```bash
$ npm install
```

## Environment Setup

Create an `.env.local` file in the root directory to add your environment variables:

```
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key
```

- `MONGODB_URI`: MongoDB connection string to connect to your database.
- `NEXT_PUBLIC_JWT_SECRET`: Secret key for JWT verification.
- `NEXT_PUBLIC_GROQ_API_KEY`: API key to connect with Groq API.

Ensure your `.env.local` file is included in `.gitignore` to keep it safe.

## Running the App

To run the app in development mode, use:

```bash
$ npm run dev
```

The app will be available at `http://localhost:3000`.

To build and run the app in production:

```bash
$ npm run build
$ npm start
```

## Dependencies

Below is a list of all the major npm dependencies and what they are used for:

1. **React**: JavaScript library for building user interfaces.
2. **Next.js**: React framework that includes server-side rendering and static site generation.
3. **Tailwind CSS**: Utility-first CSS framework for styling.
4. **mongoose**: MongoDB object modeling for node.js.
5. **jsonwebtoken**: Used for creating and verifying JSON Web Tokens (JWT) to secure routes.
6. **cookie**: Used for parsing and serializing cookies.
7. **groq-sdk**: SDK to interact with the Groq API for generating recipe suggestions.

You can install these dependencies with the command:

```bash
$ npm install react next tailwindcss mongoose jsonwebtoken cookie groq-sdk
```

## Project Structure

- **pages/**: Contains all the pages for your application.
  - **index.tsx**: The homepage.
  - **api/**: Contains serverless functions for API routes, such as adding or deleting items.
- **components/**: Reusable React components such as `Card`, `ProtectedRoute`, and `GroqSearch`.
- **utils/**: Utility files, e.g., `dbConnect.tsx` for database connection logic.
- **public/**: Static assets like images.
- **styles/**: Styling files for global styles.

## How to Use the Application

1. **Log In**: Use the provided login page to authenticate yourself.
2. **Manage Pantry Inventory**: Add, delete, or update food items in your pantry.
3. **Recipe Suggestions**: Use the `Search Recipes` button to get recipe ideas based on the inventory items and any dietary restrictions or preferences.

### Example Workflow:
- Navigate to the Dashboard and add a few pantry items such as apples, flour, and oranges.
- Input dietary restrictions if you have any (e.g., "gluten-free").
- Click on the `Search Recipes` button to generate unique recipes based on the added ingredients.

## Scripts

Here are some scripts you might find helpful:

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm start`**: Starts the production server.
- **`npm run lint`**: Runs ESLint to identify and fix linting issues.

## Security Considerations

- The Groq API key is stored in the `.env.local` file. Do not share this file or the keys with anyone.
- For production, move any server-side logic or secret-handling tasks (such as JWT and API key handling) to a secure backend server.

## Future Improvements

- **Move API calls server-side**: Improve security by moving Groq API integration to server-side to avoid exposing the API key to the browser.
- **Add User Authentication and Authorization**: Implement a robust user authentication and role-based authorization.
- **Enhanced Recipe Customization**: Allow users to rate recipes and save their favorites.

## Known Issues

- **Client-Side API Key Exposure**: Currently, the Groq API key is exposed in the browser; you should be cautious when deploying to production.
- **JWT Secret Handling**: The `JWT_SECRET` is also exposed in client-side code; this should be handled server-side instead.

## License
This project is licensed under the MIT License.

## Contributing
If you want to contribute, feel free to create a pull request or open an issue on GitHub!

## Contact
If you have any questions or need help, please contact the repository maintainer at [shairdinesha9@gmail.com].


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
