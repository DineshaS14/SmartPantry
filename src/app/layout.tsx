// src/app/layout.tsx
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Header from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'SmartPantry',
  description: 'A pantry app to manage your grocery list',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <Header/>
        {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
