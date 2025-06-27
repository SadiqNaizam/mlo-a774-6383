import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';
import { Card, CardContent } from '@/components/ui/card';

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Type for form data in this specific context
  type ForgotPasswordFormData = {
    email: string;
    password?: string; // AuthForm data type is a union, so password might be present
  };

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    console.log('Password reset requested for:', data.email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful response
    // In a real app, you would handle API success/error here.
    if (data.email.includes('fail')) {
        setError('Could not find an account with that email.');
    } else {
        toast.success('Password reset link sent!', {
            description: 'Please check your email inbox to continue.',
        });
        // Redirect to login page after a short delay
        setTimeout(() => navigate('/'), 2000); 
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <AuthForm
              mode="resetPassword"
              onSubmit={handleForgotPassword}
              isLoading={isLoading}
              error={error}
            />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;