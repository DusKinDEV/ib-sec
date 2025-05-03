import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FileSpreadsheet, Save } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import { formatCosts } from '../../utils/formatters';

interface ManualEntryForm {
  law: string;
  lawUrl: string;
  region: string;
  construction: string;
  date: string;
  cash: number;
  gold: number;
  bbl: number;
  kg: number;
}

const ManualEntryPanel: React.FC = () => {
  const { t } = useTranslation();
  const { addEntry, entries, autonomousRegions } = useDataStore();
  const [success, setSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit,
    watch,
    reset,
    formState: { errors } 
  } = useForm<ManualEntryForm>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      lawUrl: 'https://rivalregions.com/#law/details/',
      cash: 0,
      gold: 0,
      bbl: 0,
      kg: 0
    }
  });

  const resources = watch(['cash', 'gold', 'bbl', 'kg']);
  const previewCosts = {
    cash: Number(resources[0]) || 0,
    gold: Number(resources[1]) || 0,
    bbl: Number(resources[2]) || 0,
    kg: Number(resources[3]) || 0
  };
  
  const onSubmit = (data: ManualEntryForm) => {
    const newEntry = {
      date: new Date(data.date).toISOString(),
      law: data.law,
      lawUrl: data.lawUrl,
      region: data.region,
      construction: data.construction,
      resources: {
        cash: Number(data.cash),
        gold: Number(data.gold),
        bbl: Number(data.bbl),
        kg: Number(data.kg)
      }
    };
    
    addEntry(newEntry);
    
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    reset({
      date: new Date().toISOString().split('T')[0],
      lawUrl: 'https://rivalregions.com/#law/details/',
      cash: 0,
      gold: 0,
      bbl: 0,
      kg: 0
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <FileSpreadsheet className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('admin.manualEntry')}
        </h3>
      </div>
      
      <div className="p-6">
        {success && (
          <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  {t('forms.success')}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="law" className="block text-sm font-medium text-gray-700">
                {t('forms.law')} *
              </label>
              <input
                type="text"
                id="law"
                {...register('law', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
              {errors.law && (
                <p className="mt-1 text-sm text-red-600">
                  {t('forms.required')}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lawUrl" className="block text-sm font-medium text-gray-700">
                URL da Lei *
              </label>
              <input
                type="url"
                id="lawUrl"
                {...register('lawUrl', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
              {errors.lawUrl && (
                <p className="mt-1 text-sm text-red-600">
                  {t('forms.required')}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                {t('forms.region')} *
              </label>
              <select
                id="region"
                {...register('region', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="">Selecione uma região</option>
                {autonomousRegions.map(region => (
                  <option key={region.id} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="mt-1 text-sm text-red-600">
                  {t('forms.required')}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="construction" className="block text-sm font-medium text-gray-700">
                {t('forms.construction')} *
              </label>
              <select
                id="construction"
                {...register('construction', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="">Selecione uma construção</option>
                <option value="Hospital">Hospital</option>
                <option value="Estrada">Estrada</option>
                <option value="Base Militar">Base Militar</option>
                <option value="Escola">Escola</option>
                <option value="Porto">Porto</option>
              </select>
              {errors.construction && (
                <p className="mt-1 text-sm text-red-600">
                  {t('forms.required')}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                {t('forms.date')} *
              </label>
              <input
                type="date"
                id="date"
                {...register('date', { required: true })}
                max={new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">
                  {t('forms.required')}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {t('resources.total')}
            </h4>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-mono text-lg text-gray-900">
                {formatCosts(previewCosts, 0)}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label htmlFor="cash" className="block text-sm font-medium text-gray-700">
                  {t('resources.cash')}
                </label>
                <input
                  type="number"
                  id="cash"
                  step="0.1"
                  {...register('cash', { min: 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
                {errors.cash && (
                  <p className="mt-1 text-sm text-red-600">
                    {t('forms.invalid')}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="gold" className="block text-sm font-medium text-gray-700">
                  {t('resources.gold')}
                </label>
                <input
                  type="number"
                  id="gold"
                  step="0.1"
                  {...register('gold', { min: 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
                {errors.gold && (
                  <p className="mt-1 text-sm text-red-600">
                    {t('forms.invalid')}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="bbl" className="block text-sm font-medium text-gray-700">
                  {t('resources.bbl')}
                </label>
                <input
                  type="number"
                  id="bbl"
                  step="0.1"
                  {...register('bbl', { min: 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
                {errors.bbl && (
                  <p className="mt-1 text-sm text-red-600">
                    {t('forms.invalid')}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="kg" className="block text-sm font-medium text-gray-700">
                  {t('resources.kg')}
                </label>
                <input
                  type="number"
                  id="kg"
                  step="0.1"
                  {...register('kg', { min: 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
                {errors.kg && (
                  <p className="mt-1 text-sm text-red-600">
                    {t('forms.invalid')}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Save className="h-4 w-4 mr-2" />
              {t('general.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualEntryPanel;