import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { ParliamentEntry } from '../../stores/dataStore';
import { format, parseISO, startOfDay, endOfDay, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TrendChartProps {
  entries: ParliamentEntry[];
  timeRange: '7days' | '30days' | '90days' | 'custom';
}

const TrendChart: React.FC<TrendChartProps> = ({ entries, timeRange }) => {
  const { t } = useTranslation();
  
  // Prepare data for line chart
  const chartData = useMemo(() => {
    if (entries.length === 0) return [];
    
    // Get date range from entries
    const dates = entries.map(entry => new Date(entry.date));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Create array of all dates in the range
    const dateRange = eachDayOfInterval({ start: minDate, end: maxDate });
    
    // Initialize data for each day
    const dailyData = dateRange.map(date => ({
      date,
      cash: 0,
      gold: 0,
      bbl: 0,
      kg: 0,
    }));
    
    // Add values for each day
    entries.forEach(entry => {
      const entryDate = new Date(entry.date);
      const dayData = dailyData.find(d => isSameDay(d.date, entryDate));
      if (dayData) {
        dayData.cash += entry.resources.cash;
        dayData.gold += entry.resources.gold;
        dayData.bbl += entry.resources.bbl;
        dayData.kg += entry.resources.kg;
      }
    });
    
    // Format for chart
    return dailyData.map(day => ({
      date: format(day.date, 'dd/MM', { locale: ptBR }),
      cash: day.cash,
      gold: day.gold,
      bbl: day.bbl,
      kg: day.kg,
    }));
  }, [entries]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <TrendingUp className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('dashboard.weeklyTrend')}
        </h3>
      </div>
      
      <div className="p-4 h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => value}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cash" 
                name={t('resources.cash')} 
                stroke="#16A34A" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="gold" 
                name={t('resources.gold')} 
                stroke="#F59E0B" 
              />
              <Line 
                type="monotone" 
                dataKey="bbl" 
                name={t('resources.bbl')} 
                stroke="#3B82F6" 
              />
              <Line 
                type="monotone" 
                dataKey="kg" 
                name={t('resources.kg')} 
                stroke="#6D28D9" 
              />
            </RechartsLineChart>
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

export default TrendChart;