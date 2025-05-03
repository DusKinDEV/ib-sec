import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { LineChart } from 'lucide-react';
import { ParliamentEntry } from '../../stores/dataStore';

interface ResourcesChartProps {
  entries: ParliamentEntry[];
}

const ResourcesChart: React.FC<ResourcesChartProps> = ({ entries }) => {
  const { t } = useTranslation();
  
  // Prepare data for chart
  const chartData = useMemo(() => {
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
      {
        name: t('resources.cash'),
        value: totals.cash,
      },
      {
        name: t('resources.gold'),
        value: totals.gold,
      },
      {
        name: t('resources.bbl'),
        value: totals.bbl,
      },
      {
        name: t('resources.kg'),
        value: totals.kg,
      }
    ].filter(item => item.value > 0);
  }, [entries, t]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <LineChart className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('analysis.byResource')}
        </h3>
      </div>
      
      <div className="p-4 h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => new Intl.NumberFormat('pt-BR').format(value)} 
              />
              <Bar 
                dataKey="value" 
                name={t('forms.value')} 
                fill="#16A34A" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
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

export default ResourcesChart;