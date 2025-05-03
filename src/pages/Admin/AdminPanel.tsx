import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import DataSourcesPanel from './DataSourcesPanel';
import ManualEntryPanel from './ManualEntryPanel';
import UsersPanel from './UsersPanel';
import SettingsPanel from './SettingsPanel';

const AdminPanel: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  return (
    <div className="space-y-6">
      <AdminHeader />
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <AdminSidebar />
        </div>
        
        <div className="flex-1">
          <Routes>
            <Route index element={<Navigate to="data-sources" replace />} />
            <Route path="data-sources" element={<DataSourcesPanel />} />
            <Route path="manual-entry" element={<ManualEntryPanel />} />
            <Route path="users" element={<UsersPanel />} />
            <Route path="settings" element={<SettingsPanel />} />
            <Route path="*" element={<Navigate to="data-sources" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;