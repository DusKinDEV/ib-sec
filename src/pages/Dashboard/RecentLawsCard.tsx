import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Scale as ScaleBalance } from 'lucide-react';
import { ParliamentEntry } from '../../stores/dataStore';
import { formatCosts } from '../../utils/formatters';

interface RecentLawsCardProps {
  entries: ParliamentEntry[];
}

const RecentLawsCard: React.FC<RecentLawsCardProps> = ({ entries }) => {
  const { t } = useTranslation();
  
  // Sort entries by date (newest first) and take the 5 most recent
  const recentLaws = [...entries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <ScaleBalance className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('dashboard.recentLaws')}
        </h3>
      </div>
      
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {recentLaws.map((entry) => (
            <li key={entry.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <a 
                    href={entry.lawUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-green-800 hover:text-green-900 hover:underline truncate"
                  >
                    {entry.law}
                  </a>
                  <p className="mt-1 text-xs text-gray-500">
                    {entry.region} • {entry.construction}
                  </p>
                  <p className="mt-1 text-xs font-mono text-gray-600">
                    {formatCosts(entry.resources, 0)}
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="text-xs text-gray-500">
                    {format(new Date(entry.date), 'dd MMM yyyy', { locale: ptBR })}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentLawsCard;