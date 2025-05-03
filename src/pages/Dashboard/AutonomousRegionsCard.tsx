import React from 'react';
import { useTranslation } from 'react-i18next';
import { Crown } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';

const AutonomousRegionsCard: React.FC = () => {
  const { t } = useTranslation();
  const { autonomousRegions } = useDataStore();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <Crown className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          Regiões Autônomas do Império
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {autonomousRegions.map((region) => (
            <div 
              key={region.id} 
              className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="w-24 h-24 mb-3 relative">
                <img 
                  src={region.coatOfArms} 
                  alt={`Brasão de ${region.name}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.opacity = '0.5';
                    img.style.backgroundColor = '#f3f4f6';
                  }}
                />
              </div>
              <h4 className="font-medium text-gray-900">{region.name}</h4>
              {region.title && (
                <p className="text-sm text-gray-500">{region.title}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutonomousRegionsCard;