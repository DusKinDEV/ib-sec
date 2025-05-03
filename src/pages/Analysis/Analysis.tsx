import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDataStore } from '../../stores/dataStore';
import AnalysisHeader from './AnalysisHeader';
import ResourcesChart from './ResourcesChart';
import RegionCostTable from './RegionCostTable';
import FilterPanel from './FilterPanel';
import TrendChart from './TrendChart';

type TimeRange = '7days' | '30days' | '90days' | 'custom';

const Analysis: React.FC = () => {
  const { t } = useTranslation();
  const { entries } = useDataStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('30days');
  const [customDateRange, setCustomDateRange] = useState<{
    start: string;
    end: string;
  }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  
  // Filter entries based on selected time range
  const filteredEntries = React.useMemo(() => {
    if (entries.length === 0) return [];
    
    const endDate = new Date();
    let startDate: Date;
    
    if (timeRange === 'custom') {
      startDate = new Date(customDateRange.start);
      endDate.setHours(23, 59, 59, 999);
    } else {
      const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
      startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      startDate.setHours(0, 0, 0, 0);
    }
    
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  }, [entries, timeRange, customDateRange]);
  
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };
  
  const handleCustomDateChange = (start: string, end: string) => {
    setCustomDateRange({ start, end });
  };
  
  return (
    <div className="space-y-6">
      <AnalysisHeader />
      
      <FilterPanel 
        timeRange={timeRange}
        customDateRange={customDateRange}
        onTimeRangeChange={handleTimeRangeChange}
        onCustomDateChange={handleCustomDateChange}
      />
      
      {filteredEntries.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">{t('general.noData')}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourcesChart entries={filteredEntries} />
            <TrendChart entries={filteredEntries} timeRange={timeRange} />
          </div>
          
          <RegionCostTable entries={filteredEntries} />
        </>
      )}
    </div>
  );
};

export default Analysis;