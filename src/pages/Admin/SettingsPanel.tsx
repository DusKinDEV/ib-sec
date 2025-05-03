import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Palette, Layout, Type } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

const SettingsPanel: React.FC = () => {
  const { t } = useTranslation();
  const { 
    primaryColor, 
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    fontSize,
    setFontSize
  } = useThemeStore();
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100 flex items-center">
        <Settings className="h-5 w-5 text-green-700 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('admin.settings')}
        </h3>
      </div>
      
      <div className="p-6 space-y-6">
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            Configurações salvas com sucesso!
          </div>
        )}

        <div className="space-y-4">
          <div>
            <h4 className="flex items-center text-lg font-medium text-gray-900 mb-4">
              <Palette className="h-5 w-5 mr-2" />
              Cores do Tema
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cor Primária
                </label>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cor Secundária
                </label>
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="flex items-center text-lg font-medium text-gray-900 mb-4">
              <Type className="h-5 w-5 mr-2" />
              Tipografia
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tamanho da Fonte Base
              </label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="sm">Pequeno</option>
                <option value="base">Médio</option>
                <option value="lg">Grande</option>
                <option value="xl">Extra Grande</option>
              </select>
            </div>
          </div>

          <div>
            <h4 className="flex items-center text-lg font-medium text-gray-900 mb-4">
              <Layout className="h-5 w-5 mr-2" />
              Layout
            </h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sidebarCollapsible"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label htmlFor="sidebarCollapsible" className="ml-2 block text-sm text-gray-900">
                  Barra lateral recolhível
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="compactMode"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label htmlFor="compactMode" className="ml-2 block text-sm text-gray-900">
                  Modo compacto
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;