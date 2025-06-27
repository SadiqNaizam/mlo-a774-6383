import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SocialAuthButtons from '@/components/SocialAuthButtons';

// Schemas for different modes
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

// Union of schemas to infer the form data type
const formSchema = z.union([loginSchema, signUpSchema, resetPasswordSchema]);
type FormData = z.infer<typeof formSchema>;

// Props definition
interface AuthFormProps {
  mode: 'login' | 'signUp' | 'resetPassword';
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isLoading, error }) => {
  console.log(`AuthForm loaded in ${mode} mode.`);
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const currentSchema = 
    mode === 'login' ? loginSchema :
    mode === 'signUp' ? signUpSchema : 
    resetPasswordSchema;

  const form = useForm<FormData>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    form.reset();
  }, [mode, form]);

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome back';
      case 'signUp': return 'Create an account';
      case 'resetPassword': return 'Reset your password';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'login': return 'Enter your email and password to sign in.';
      case 'signUp': return 'Enter your details to get started.';
      case 'resetPassword': return "We'll email you a link to reset your password.";
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case 'login': return 'Sign In';
      case 'signUp': return 'Create Account';
      case 'resetPassword': return 'Send Reset Link';
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{getTitle()}</h1>
        <p className="text-sm text-muted-foreground mt-2">{getDescription()}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(mode === 'login' || mode === 'signUp') && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {mode === 'login' && (
                      <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {getButtonText()}
          </Button>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <SocialAuthButtons />

      <div className="mt-6 text-center text-sm">
        {mode === 'login' && (
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/sign-up" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        )}
        {mode === 'signUp' && (
          <p>
            Already have an account?{' '}
            <Link to="/" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        )}
        {mode === 'resetPassword' && (
          <p>
            Remember your password?{' '}
            <Link to="/" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;