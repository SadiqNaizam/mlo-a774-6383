import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-4 sm:px-6 lg:px-8 border-t bg-background">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} SwiftAuth Login. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <Link
            to="/terms"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;