import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Settings, 
  FilePieChart,
  Database,
  Users,
  FileSpreadsheet
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
  const navigationItems = [
    {
      name: t('general.dashboard'),
      to: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      allowedRoles: ['admin', 'user']
    },
    {
      name: t('analysis.title'),
      to: '/analysis',
      icon: <TrendingUp className="h-5 w-5" />,
      allowedRoles: ['admin', 'user']
    }
  ];
  
  const adminItems = [
    {
      name: t('admin.dataSources'),
      to: '/admin/data-sources',
      icon: <Database className="h-5 w-5" />,
      allowedRoles: ['admin']
    },
    {
      name: t('admin.manualEntry'),
      to: '/admin/manual-entry',
      icon: <FileSpreadsheet className="h-5 w-5" />,
      allowedRoles: ['admin']
    },
    {
      name: t('admin.users'),
      to: '/admin/users',
      icon: <Users className="h-5 w-5" />,
      allowedRoles: ['admin']
    },
    {
      name: t('admin.settings'),
      to: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
      allowedRoles: ['admin']
    }
  ];

  const filterItemsByRole = (items: typeof navigationItems) => {
    if (!user) return [];
    return items.filter(item => 
      item.allowedRoles.includes(user.role)
    );
  };

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4">
        <div className="text-lg font-semibold text-green-800 mb-6">
          {t('general.appName')}
        </div>
        
        <nav className="space-y-1">
          {filterItemsByRole(navigationItems).map((item) => (
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
          
          {user?.role === 'admin' && (
            <div className="pt-5 mt-5 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t('admin.title')}
              </div>
              
              {filterItemsByRole(adminItems).map((item) => (
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
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;