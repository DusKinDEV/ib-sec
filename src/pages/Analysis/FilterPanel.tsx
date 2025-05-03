import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  timeRange: '7days' | '30days' | '90days' | 'custom';
  customDateRange: {
    start: string;
    end: string;
  };
  onTimeRangeChange: (range: '7days' | '30days' | '90days' | 'custom') => void;
  onCustomDateChange: (start: string, end: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  timeRange, 
  customDateRange, 
  onTimeRangeChange, 
  onCustomDateChange 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-4 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <Filter className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('analysis.filters')}
        </h3>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('analysis.timeRange')}
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => onTimeRangeChange('7days')}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === '7days'
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                7 dias
              </button>
              <button
                onClick={() => onTimeRangeChange('30days')}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === '30days'
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                30 dias
              </button>
              <button
                onClick={() => onTimeRangeChange('90days')}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === '90days'
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                90 dias
              </button>
              <button
                onClick={() => onTimeRangeChange('custom')}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === 'custom'
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('analysis.customDateRange')}
              </button>
            </div>
          </div>
          
          {timeRange === 'custom' && (
            <div className="flex space-x-4">
              <div className="space-y-1">
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                  {t('forms.startDate')}
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={customDateRange.start}
                  onChange={(e) => onCustomDateChange(e.target.value, customDateRange.end)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                  {t('forms.endDate')}
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={customDateRange.end}
                  onChange={(e) => onCustomDateChange(customDateRange.start, e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;