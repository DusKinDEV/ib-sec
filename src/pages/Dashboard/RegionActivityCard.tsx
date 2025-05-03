import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Map } from 'lucide-react';
import { ParliamentEntry } from '../../stores/dataStore';

interface RegionActivityCardProps {
  entries: ParliamentEntry[];
}

const RegionActivityCard: React.FC<RegionActivityCardProps> = ({ entries }) => {
  const { t } = useTranslation();
  
  // Calculate activity by region
  const regionData = useMemo(() => {
    const regionCounts = entries.reduce((acc, entry) => {
      if (!acc[entry.region]) {
        acc[entry.region] = 0;
      }
      acc[entry.region] += 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Convert to array and sort by count (highest first)
    return Object.entries(regionCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);  // Take top 5 regions
  }, [entries]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <Map className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('dashboard.regionActivity')}
        </h3>
      </div>
      
      <div className="p-4 h-80">
        {regionData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={regionData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Bar 
                dataKey="count" 
                name={t('general.count')} 
                fill="#16A34A" 
                barSize={20} 
                radius={[0, 4, 4, 0]} 
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

export default RegionActivityCard;