import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';

const Layout: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <footer className="bg-green-800 text-white p-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {t('general.appName')}</p>
        <p className="text-xs mt-1 text-green-100">Desenvolvido por DusKin</p>
      </footer>
    </div>
  );
};

export default Layout;