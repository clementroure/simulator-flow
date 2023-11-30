import create from 'zustand'

// Define a type for your store state
interface GraphData {
  nodes: any[]; 
  edges: any[]; 
}

interface GraphDataStore {
  graphData: GraphData;
  setGraphData: (data: GraphData) => void;
}

const useStore = create<GraphDataStore>((set) => ({
  graphData: { nodes: [], edges: [] },
  setGraphData: (data) => set({ graphData: data }),
}));

export default useStore;
