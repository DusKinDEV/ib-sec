import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Database, 
  Edit, 
  Trash2, 
  Plus, 
  RefreshCw 
} from 'lucide-react';
import { useDataStore, DataSource } from '../../stores/dataStore';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DataSourceFormData {
  url: string;
  description: string;
  active: boolean;
}

const DataSourcesPanel: React.FC = () => {
  const { t } = useTranslation();
  const { 
    dataSources, 
    fetchData, 
    addDataSource, 
    updateDataSource, 
    deleteDataSource 
  } = useDataStore();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<DataSourceFormData>({
    url: '',
    description: '',
    active: true
  });
  
  const resetForm = () => {
    setFormData({
      url: '',
      description: '',
      active: true
    });
    setEditingId(null);
  };
  
  const handleOpenForm = (dataSource?: DataSource) => {
    if (dataSource) {
      setFormData({
        url: dataSource.url,
        description: dataSource.description,
        active: dataSource.active
      });
      setEditingId(dataSource.id);
    } else {
      resetForm();
    }
    setIsFormOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateDataSource(editingId, formData);
    } else {
      addDataSource(formData);
    }
    
    setIsFormOpen(false);
    resetForm();
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm(t('forms.confirmDelete'))) {
      deleteDataSource(id);
    }
  };
  
  const handleManualFetch = async (url: string) => {
    try {
      await fetchData(url);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex justify-between items-center">
        <div className="flex items-center">
          <Database className="h-5 w-5 text-green-700 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            {t('admin.dataSources')}
          </h3>
        </div>
        
        <button
          onClick={() => handleOpenForm()}
          className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          {t('admin.addUrl')}
        </button>
      </div>
      
      {/* Form */}
      {isFormOpen && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                {t('forms.dataUrl')}
              </label>
              <input
                type="url"
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                {t('forms.description')}
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                {t('forms.active')}
              </label>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {t('general.cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {editingId ? t('general.edit') : t('general.add')}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('forms.description')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('forms.status')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.lastFetch')}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('general.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataSources.map((source) => (
              <tr key={source.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {source.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-900 underline"
                  >
                    {source.url.length > 40 ? `${source.url.substring(0, 40)}...` : source.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    source.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {source.active ? t('general.active') : t('general.inactive')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {source.lastFetched 
                    ? format(new Date(source.lastFetched), 'Pp', { locale: ptBR })
                    : t('general.never')
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleManualFetch(source.url)}
                      className="text-blue-600 hover:text-blue-900"
                      title={t('admin.manualFetch')}
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleOpenForm(source)}
                      className="text-green-600 hover:text-green-900"
                      title={t('general.edit')}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(source.id)}
                      className="text-red-600 hover:text-red-900"
                      title={t('general.delete')}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {dataSources.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
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

export default DataSourcesPanel;