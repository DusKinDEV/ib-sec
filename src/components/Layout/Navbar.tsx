import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Flag, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Flag className="h-8 w-8 text-yellow-300" />
              <span className="font-bold text-xl">
                {t('general.appName')}
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  {t('general.dashboard')}
                </Link>
                <Link 
                  to="/analysis" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  {t('general.analysis')}
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                  >
                    {t('general.admin')}
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  {t('general.logout')}
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
              >
                <User className="h-4 w-4 mr-1" />
                {t('general.login')}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-800 pb-3 px-4">
          {isAuthenticated ? (
            <div className="space-y-1">
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('general.dashboard')}
              </Link>
              <Link
                to="/analysis"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('general.analysis')}
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('general.admin')}
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              >
                <LogOut className="h-5 w-5 mr-2" />
                {t('general.logout')}
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                to="/login"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                {t('general.login')}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;