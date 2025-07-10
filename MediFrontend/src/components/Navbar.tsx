import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Heart className="h-6 w-6 text-white group-hover:animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse opacity-75"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-indigo-700 transition-all duration-300">
                MediMind
              </span>
              <span className="text-xs text-gray-500 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Your Health Companion
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link 
                to="#features" 
                className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="#about" 
                className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="#support" 
                className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
              >
                Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Sign In
              </Link>
              <Link to="/register">
                <Button size="sm" className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="#features" 
                className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="#about" 
                className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="#support" 
                className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link 
                  to="/login" 
                  className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 