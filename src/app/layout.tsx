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
      <head>
        {/* Google Analytics Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9CFYQQCVR8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9CFYQQCVR8');
            `,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
