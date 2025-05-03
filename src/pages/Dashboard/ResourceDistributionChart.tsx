import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CircleDollarSign } from 'lucide-react';
import { ParliamentEntry } from '../../stores/dataStore';

interface ResourceDistributionChartProps {
  entries: ParliamentEntry[];
}

const ResourceDistributionChart: React.FC<ResourceDistributionChartProps> = ({ entries }) => {
  const { t } = useTranslation();
  
  // Calculate the total for each resource type
  const resourceData = useMemo(() => {
    const totals = entries.reduce(
      (acc, entry) => {
        acc.cash += entry.resources.cash;
        acc.gold += entry.resources.gold;
        acc.bbl += entry.resources.bbl;
        acc.kg += entry.resources.kg;
        return acc;
      },
      { cash: 0, gold: 0, bbl: 0, kg: 0 }
    );
    
    return [
      { name: t('resources.cash'), value: totals.cash, color: '#10B981' },  // Green
      { name: t('resources.gold'), value: totals.gold, color: '#F59E0B' },  // Yellow
      { name: t('resources.bbl'), value: totals.bbl, color: '#3B82F6' },    // Blue
      { name: t('resources.kg'), value: totals.kg, color: '#6D28D9' }       // Purple
    ].filter(item => item.value > 0);
  }, [entries, t]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <CircleDollarSign className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('dashboard.resourceDistribution')}
        </h3>
      </div>
      
      <div className="p-4 h-80">
        {resourceData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={resourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {resourceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => new Intl.NumberFormat('pt-BR').format(value)} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">{t('general.noData')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDistributionChart;