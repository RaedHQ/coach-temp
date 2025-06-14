import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  centered?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, centered = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-primary-500 hover:text-primary-400 transition-colors">
            <GraduationCap size={28} />
            <span className="text-xl font-semibold">EduConnect</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link>
          </nav>
        </div>
      </header>

      <main className={`flex-grow ${centered ? 'flex items-center justify-center px-4' : 'container mx-auto px-4 py-8'}`}>
        {children}
      </main>

      <footer className="py-6 border-t border-gray-800 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          © {new Date().getFullYear()} EduConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;