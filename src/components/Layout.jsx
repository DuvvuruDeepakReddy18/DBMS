import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Home, BookOpen, Briefcase, Calendar, Award, Crown,
  LogOut, Menu, X, BarChart3, DollarSign, Building2, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/rewards', label: 'Rewards', icon: Award },
    { path: '/progress', label: 'Progress', icon: BarChart3 },
  ];

  if (currentUser?.role === 'Sponsor') {
    navItems.push({ path: '/sponsor-dashboard', label: 'My Events', icon: Building2 });
  }

  if (currentUser?.role === 'Admin') {
    navItems.push({ path: '/admin', label: 'Admin Portal', icon: Shield });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CB</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CareerBoost
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`flex items-center space-x-2 ${isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'text-gray-700 hover:text-blue-600'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser?.subscriptionStatus === 'premium' && (
                <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-semibold">Premium</span>
                </div>
              )}
              <Link to="/premium">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Crown className="w-4 h-4" />
                  <span>Upgrade</span>
                </Button>
              </Link>
              <Link to="/payment-history">
                <Button variant="ghost" size="icon">
                  <DollarSign className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {currentUser?.fullName?.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{currentUser?.fullName}</div>
                  <div className="text-gray-500 text-xs">{currentUser?.role}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start flex items-center space-x-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
              <Button
                variant="ghost"
                className="w-full justify-start flex items-center space-x-2 text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CB</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  CareerBoost
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering careers through personalized learning and opportunities.
              </p>
            </div>
            <div>
              <span className="font-semibold text-gray-900 mb-3 block">Platform</span>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Courses</p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Jobs</p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Events</p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Rewards</p>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-900 mb-3 block">Support</span>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Help Center</p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Contact Us</p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Privacy Policy</p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Terms of Service</p>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-900 mb-3 block">Connect</span>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">LinkedIn</p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Twitter</p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Facebook</p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Instagram</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-gray-600 text-sm">
              © 2026 CareerBoost. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;