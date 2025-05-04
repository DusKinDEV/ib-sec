import { create } from 'zustand';
import axios from 'axios';

export interface ResourceCost {
  cash: number;
  gold: number;
  bbl: number;
  kg: number;
}

export interface ParliamentEntry {
  id: string;
  date: string;
  law: string;
  lawUrl: string;
  region: string;
  construction: string;
  resources: ResourceCost;
}

export interface AutonomousRegion {
  id: string;
  name: string;
  title: string;
  coatOfArms: string;
}

export interface DataSource {
  id: string;
  url: string;
  description: string;
  active: boolean;
  lastFetched: string | null;
}

interface DataState {
  entries: ParliamentEntry[];
  dataSources: DataSource[];
  autonomousRegions: AutonomousRegion[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchData: () => Promise<void>;
  addEntry: (entry: Omit<ParliamentEntry, 'id'>) => Promise<void>;
  updateEntry: (id: string, entry: Partial<ParliamentEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  addDataSource: (dataSource: Omit<DataSource, 'id'>) => void;
  updateDataSource: (id: string, dataSource: Partial<DataSource>) => void;
  deleteDataSource: (id: string) => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  entries: [],
  autonomousRegions: [
    {
      id: '1',
      name: 'Ducado de Serpa',
      title: 'Ducado',
      coatOfArms: 'https://static.rivalregions.com/static/states_gerbs/4915_m/4915_1744060471_big.png'
    },
    {
      id: '2',
      name: 'Viscondado da Paraíba',
      title: 'Viscondado',
      coatOfArms: 'https://static.rivalregions.com/static/states_gerbs/4915_m/4915_1742161223_big.png'
    },
    {
      id: '3',
      name: 'Ducado de Pernambuco',
      title: 'Ducado',
      coatOfArms: 'https://static.rivalregions.com/static/states_gerbs/4915_m/4915_1742266067_big.png'
    },
    {
      id: '4',
      name: 'Viscondado de S. Paulo',
      title: 'Viscondado',
      coatOfArms: 'https://static.rivalregions.com/static/states_gerbs/4915_m/4915_1744283563_big.png'
    },
    {
      id: '5',
      name: 'Ducado de Tocantins',
      title: 'Ducado',
      coatOfArms: 'https://static.rivalregions.com/static/states_gerbs/4915_m/4915_1742531301_big.png'
    },
    {
      id: '6',
      name: 'Viscondado do Ceará',
      title: 'Viscondado',
      coatOfArms: 'https://static.rivalregions.com/static/states_gerbs/4915_m/4915_1743375399_big.png'
    },
    {
      id: '7',
      name: 'Limpopo',
      title: 'Região Autônoma',
      coatOfArms: 'https://static.rivalregions.com/static/regions_gerbs/15501_big.png?5'
    },
    {
      id: '8',
      name: 'Viscondado do Planalto',
      title: 'Viscondado',
      coatOfArms: 'https://static.rivalregions.com/static/states_gerbs/4915_m/4915_1744253259_big.png'
    }
  ],
  dataSources: [
    {
      id: '1',
      url: 'https://rivalregions.com/#log/index/parliament/3005606',
      description: 'Parlamento do Império do Brasil',
      active: true,
      lastFetched: null
    }
  ],
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('http://localhost:4000/entries');
      set({ entries: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch entries', isLoading: false });
    }
  },

  addEntry: async (entry) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('http://localhost:4000/entries', entry);
      set({ entries: [...get().entries, response.data], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to add entry', isLoading: false });
    }
  },

  updateEntry: async (id, entry) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`http://localhost:4000/entries/${id}`, entry);
      set({
        entries: get().entries.map(e => e.id === id ? response.data : e),
        isLoading: false
      });
    } catch (error) {
      set({ error: 'Failed to update entry', isLoading: false });
    }
  },

  deleteEntry: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`http://localhost:4000/entries/${id}`);
      set({
        entries: get().entries.filter(e => e.id !== id),
        isLoading: false
      });
    } catch (error) {
      set({ error: 'Failed to delete entry', isLoading: false });
    }
  },

  addDataSource: (dataSource) => {
    const newDataSource = {
      ...dataSource,
      id: Date.now().toString()
    };
    set({ dataSources: [...get().dataSources, newDataSource] });
  },

  updateDataSource: (id, dataSource) => {
    set({
      dataSources: get().dataSources.map(ds =>
        ds.id === id ? { ...ds, ...dataSource } : ds
      )
    });
  },

  deleteDataSource: (id) => {
    set({ dataSources: get().dataSources.filter(ds => ds.id !== id) });
  }
}));
