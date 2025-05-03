import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Database, 
  FileSpreadsheet, 
  Users, 
  Settings 
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const { t } = useTranslation();
  
  const navigationItems = [
    {
      name: t('admin.dataSources'),
      to: 'data-sources',
      icon: <Database className="h-5 w-5" />
    },
    {
      name: t('admin.manualEntry'),
      to: 'manual-entry',
      icon: <FileSpreadsheet className="h-5 w-5" />
    },
    {
      name: t('admin.users'),
      to: 'users',
      icon: <Users className="h-5 w-5" />
    },
    {
      name: t('admin.settings'),
      to: 'settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100">
        <h3 className="text-lg font-medium text-gray-900">
          {t('admin.title')}
        </h3>
      </div>
      
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium
              ${isActive 
                ? 'bg-green-100 text-green-800' 
                : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;