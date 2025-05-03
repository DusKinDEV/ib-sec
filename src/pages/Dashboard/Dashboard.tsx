import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDataStore } from '../../stores/dataStore';
import DashboardHeader from './DashboardHeader';
import RecentLawsCard from './RecentLawsCard';
import ResourceDistributionChart from './ResourceDistributionChart';
import RegionActivityCard from './RegionActivityCard';
import TodayCostsCard from './TodayCostsCard';
import AutonomousRegionsCard from './AutonomousRegionsCard';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { 
    entries, 
    dataSources, 
    isLoading, 
    fetchData 
  } = useDataStore();

  useEffect(() => {
    const activeSource = dataSources.find(ds => ds.active);
    if (activeSource && (!activeSource.lastFetched || entries.length === 0)) {
      fetchData(activeSource.url);
    }
  }, [dataSources, entries.length, fetchData]);

  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-green-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-medium text-gray-700">{t('general.loading')}</p>
          </div>
        </div>
      )}
      
      {!isLoading && entries.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">{t('general.noData')}</p>
            <p className="text-sm text-gray-500 mt-2">
              {t('admin.manualFetch')} {t('admin.title').toLowerCase()} {t('general.or').toLowerCase()} {t('admin.manualEntry').toLowerCase()}.
            </p>
          </div>
        </div>
      )}
      
      {!isLoading && entries.length > 0 && (
        <>
          <AutonomousRegionsCard />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TodayCostsCard entries={entries} />
            <RecentLawsCard entries={entries} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourceDistributionChart entries={entries} />
            <RegionActivityCard entries={entries} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;