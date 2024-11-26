'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const { token } = cookie.parse(document.cookie || '');

      if (!token) {
        router.push('/login');
        return;
      }

      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'secret');
      // Optionally, you can use the decoded token data here
      console.log('Token decoded successfully:', decoded);
      setLoading(false);
    } catch (error) {
      console.error('Token verification failed:', error);
      router.push('/login');
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
