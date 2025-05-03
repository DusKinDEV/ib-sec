import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isToday } from 'date-fns';
import { Coins } from 'lucide-react';
import { ParliamentEntry } from '../../stores/dataStore';
import { formatResourceValue, formatCosts } from '../../utils/formatters';

interface TodayCostsCardProps {
  entries: ParliamentEntry[];
}

const TodayCostsCard: React.FC<TodayCostsCardProps> = ({ entries }) => {
  const { t } = useTranslation();
  
  const { todayEntries, totalCosts, percentageChange } = useMemo(() => {
    const today = entries.filter(entry => isToday(new Date(entry.date)));
    
    const costs = today.reduce(
      (acc, entry) => {
        acc.cash += entry.resources.cash;
        acc.gold += entry.resources.gold;
        acc.bbl += entry.resources.bbl;
        acc.kg += entry.resources.kg;
        return acc;
      },
      { cash: 0, gold: 0, bbl: 0, kg: 0 }
    );

    // Calculate percentage change from previous day
    const yesterday = entries.filter(entry => {
      const date = new Date(entry.date);
      date.setDate(date.getDate() + 1);
      return isToday(date);
    });

    const yesterdayCosts = yesterday.reduce(
      (acc, entry) => {
        acc.cash += entry.resources.cash;
        acc.gold += entry.resources.gold;
        acc.bbl += entry.resources.bbl;
        acc.kg += entry.resources.kg;
        return acc;
      },
      { cash: 0, gold: 0, bbl: 0, kg: 0 }
    );

    const totalToday = costs.cash + costs.gold + costs.bbl + costs.kg;
    const totalYesterday = yesterdayCosts.cash + yesterdayCosts.gold + yesterdayCosts.bbl + yesterdayCosts.kg;
    
    const percentChange = totalYesterday ? ((totalToday - totalYesterday) / totalYesterday) * 100 : 0;
    
    return { todayEntries: today, totalCosts: costs, percentageChange: percentChange };
  }, [entries]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <Coins className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('dashboard.todayCosts')}
        </h3>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        <div className="text-lg font-mono text-gray-900 mb-4">
          {formatCosts(totalCosts, percentageChange)}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">
              {t('resources.cash')}
            </dt>
            <dd className="mt-1 text-lg font-mono font-semibold text-green-700">
              {formatResourceValue(totalCosts.cash)}
            </dd>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">
              {t('resources.gold')}
            </dt>
            <dd className="mt-1 text-lg font-mono font-semibold text-yellow-600">
              {formatResourceValue(totalCosts.gold)}
            </dd>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">
              {t('resources.bbl')}
            </dt>
            <dd className="mt-1 text-lg font-mono font-semibold text-blue-600">
              {formatResourceValue(totalCosts.bbl)}
            </dd>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">
              {t('resources.kg')}
            </dt>
            <dd className="mt-1 text-lg font-mono font-semibold text-purple-600">
              {formatResourceValue(totalCosts.kg)}
            </dd>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            {t('dashboard.summary')}
          </h4>
          <p className="text-sm text-gray-700">
            {todayEntries.length > 0 
              ? `${todayEntries.length} ${t('general.entriesFound')}`
              : t('general.noData')
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayCostsCard;