import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';

// shadcn/ui Components
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

const SignUpPage: React.FC = () => {
  console.log('SignUpPage loaded');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle form submission
  const handleSignUp = async (data: any) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call
    console.log('Signing up with:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful sign-up
    // In a real app, you would handle API responses here.
    // For example, if (response.ok) { ... } else { ... }
    const isSuccess = true; 

    if (isSuccess) {
      toast({
        title: "Account Created!",
        description: "You have successfully signed up. Redirecting...",
      });
      navigate('/auth-success'); // Redirect to a success page as defined in App.tsx
    } else {
      // Simulate an error from the server
      setError("An account with this email already exists.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <AuthForm
              mode="signUp"
              onSubmit={handleSignUp}
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

export default SignUpPage;