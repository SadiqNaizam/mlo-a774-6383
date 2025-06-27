import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';
import { Card, CardContent } from '@/components/ui/card';

// Define the shape of the form data for clarity, based on AuthForm's internal types.
// This helps with type safety in the handleSubmit function.
interface LoginFormData {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Simulate an API call for login
  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    console.log('Attempting login with:', data);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a failed login for a specific email to test error handling
    if (data.email === 'error@example.com') {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    } else {
      // On successful login, navigate to the success page
      console.log('Login successful, navigating to /auth-success');
      navigate('/auth-success');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <AuthForm
              mode="login"
              onSubmit={handleLoginSubmit}
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

export default LoginPage;