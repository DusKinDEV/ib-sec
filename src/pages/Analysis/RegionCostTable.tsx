import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ParliamentEntry } from '../../stores/dataStore';

interface RegionCostTableProps {
  entries: ParliamentEntry[];
}

interface RegionSummary {
  region: string;
  cash: number;
  gold: number;
  bbl: number;
  kg: number;
  count: number;
}

const RegionCostTable: React.FC<RegionCostTableProps> = ({ entries }) => {
  const { t } = useTranslation();
  
  // Summarize data by region
  const regionData = useMemo(() => {
    const summary: Record<string, RegionSummary> = {};
    
    entries.forEach(entry => {
      if (!summary[entry.region]) {
        summary[entry.region] = {
          region: entry.region,
          cash: 0,
          gold: 0,
          bbl: 0,
          kg: 0,
          count: 0
        };
      }
      
      summary[entry.region].cash += entry.resources.cash;
      summary[entry.region].gold += entry.resources.gold;
      summary[entry.region].bbl += entry.resources.bbl;
      summary[entry.region].kg += entry.resources.kg;
      summary[entry.region].count += 1;
    });
    
    return Object.values(summary).sort((a, b) => b.cash - a.cash);
  }, [entries]);
  
  const formatter = new Intl.NumberFormat('pt-BR');
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100">
        <h3 className="text-lg font-medium text-gray-900">
          {t('analysis.byRegion')}
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('forms.region')}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resources.cash')}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resources.gold')}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resources.bbl')}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resources.kg')}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('general.count')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {regionData.map((region) => (
              <tr key={region.region} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {region.region}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {formatter.format(region.cash)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {formatter.format(region.gold)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {formatter.format(region.bbl)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {formatter.format(region.kg)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {region.count}
                </td>
              </tr>
            ))}
            
            {regionData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 text-center">
                  {t('general.noData')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionCostTable;