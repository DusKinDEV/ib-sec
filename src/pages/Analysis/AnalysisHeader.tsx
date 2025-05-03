import React from 'react';
import { useTranslation } from 'react-i18next';
import { DownloadCloud, FileSpreadsheet } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import * as XLSX from 'xlsx';

const AnalysisHeader: React.FC = () => {
  const { t } = useTranslation();
  const { entries } = useDataStore();
  
  const exportToExcel = () => {
    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(
      entries.map(entry => ({
        [t('forms.date')]: new Date(entry.date).toLocaleDateString('pt-BR'),
        [t('forms.law')]: entry.law,
        [t('forms.region')]: entry.region,
        [t('forms.construction')]: entry.construction,
        [t('resources.cash')]: entry.resources.cash,
        [t('resources.gold')]: entry.resources.gold,
        [t('resources.bbl')]: entry.resources.bbl,
        [t('resources.kg')]: entry.resources.kg,
      }))
    );
    
    // Create workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'analise-autonomias.xlsx');
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {t('analysis.title')}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {t('export.title')}: {entries.length} {t('general.entries')}
        </p>
      </div>
      
      <div className="mt-4 md:mt-0 space-x-2">
        <button 
          onClick={exportToExcel}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          {t('export.excel')}
        </button>
        
        <button 
          className="inline-flex items-center px-4 py-2 border border-green-700 rounded-md shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <DownloadCloud className="h-4 w-4 mr-2" />
          {t('analysis.generateReport')}
        </button>
      </div>
    </div>
  );
};

export default AnalysisHeader;