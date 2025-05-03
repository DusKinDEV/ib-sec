import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings } from 'lucide-react';

const AdminHeader: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="flex items-center">
        <Settings className="h-6 w-6 text-green-700 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">
          {t('admin.title')}
        </h1>
      </div>
      
      <div className="mt-4 md:mt-0">
        <p className="text-sm text-gray-500">
          {t('general.adminAccess')}
        </p>
      </div>
    </div>
  );
};

export default AdminHeader;