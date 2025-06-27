import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const AuthSuccessPage: React.FC = () => {
  console.log('AuthSuccessPage loaded');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the main dashboard or home page after a short delay
    const timer = setTimeout(() => {
      // In a real app, this would be the dashboard route, e.g., '/dashboard'
      // Based on App.tsx, we'll redirect to the root which is the LoginPage.
      navigate('/');
    }, 3000); // 3-second delay

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardHeader>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <CardTitle className="text-2xl">Success!</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You have been successfully authenticated.
            </p>
            <p className="text-muted-foreground mt-2">
              You will be redirected shortly...
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AuthSuccessPage;