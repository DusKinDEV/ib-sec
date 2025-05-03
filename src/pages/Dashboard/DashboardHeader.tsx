import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DownloadCloud } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';

const DashboardHeader: React.FC = () => {
  const { t } = useTranslation();
  const { dataSources } = useDataStore();
  
  const activeSource = dataSources.find(ds => ds.active);
  const lastUpdate = activeSource?.lastFetched 
    ? format(new Date(activeSource.lastFetched), 'PPpp', { locale: ptBR })
    : t('general.never');
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {t('dashboard.title')}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {t('dashboard.lastUpdate')}: {lastUpdate}
        </p>
      </div>
      
      <div className="mt-4 md:mt-0">
        <button 
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <DownloadCloud className="h-4 w-4 mr-2" />
          {t('export.excel')}
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;