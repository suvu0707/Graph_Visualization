import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { undo, redo } from './historySlice.tsx';

interface Position {
  x: number;
  y: number;
}

interface NodeData {
  label: string;
  color: string;
  fontSize: number;
}

interface Node {
  id: string;
  position: Position;
  data: NodeData;
  style: React.CSSProperties;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface GraphState {
  nodes: Node[];
  edges: Edge[];
}

const nodes: Node[] = [
  { id: 'node-0', position: { x: 0, y: 0 }, data: { label: 'Node 0', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
  { id: 'node-1', position: { x: 200, y: 0 }, data: { label: 'Node 1', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
  { id: 'node-2', position: { x: 400, y: 0 }, data: { label: 'Node 2', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
  { id: 'node-3', position: { x: 600, y: 0 }, data: { label: 'Node 3', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
  { id: 'node-4', position: { x: 800, y: 0 }, data: { label: 'Node 4', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
  { id: 'node-5', position: { x: 1000, y: 0 }, data: { label: 'Node 5', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
  { id: 'node-6', position: { x: 1200, y: 0 }, data: { label: 'Node 6', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
  { id: 'node-7', position: { x: 1400, y: 0 }, data: { label: 'Node 7', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
  { id: 'node-8', position: { x: 1600, y: 0 }, data: { label: 'Node 8', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
  { id: 'node-9', position: { x: 1800, y: 0 }, data: { label: 'Node 9', color: '#ffcc00', fontSize: 14 }, style: { border: "1.5px solid black", fontSize: 14 } },
];

const edges: Edge[] = [
  { id: 'edge-0', source: 'node-0', target: 'node-1' },
  { id: 'edge-1', source: 'node-1', target: 'node-2' },
  { id: 'edge-2', source: 'node-2', target: 'node-3' },
  { id: 'edge-3', source: 'node-3', target: 'node-4' },
  { id: 'edge-4', source: 'node-4', target: 'node-5' },
  { id: 'edge-5', source: 'node-5', target: 'node-6' },
  { id: 'edge-6', source: 'node-6', target: 'node-7' },
  { id: 'edge-7', source: 'node-7', target: 'node-8' },
  { id: 'edge-8', source: 'node-8', target: 'node-9' },
];

const initialState: GraphState = {
  nodes: nodes,
  edges: edges,
};

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    updateNodeColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const { id, color } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.data.color = color;
        node.style = { ...node.style, borderColor: color }; // Update style
      }
    },
    updateNodeFontSize: (state, action: PayloadAction<{ id: string; fontSize: number }>) => {
      const { id, fontSize } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.data.fontSize = fontSize;
        node.style = { ...node.style, fontSize: fontSize }; // Update style
      }
    },
    updateNodePosition: (state, action: PayloadAction<{ id: string; position: Position }>) => {
      const { id, position } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.position = position; // Update node position
      }
    },
    // Add a new reducer to update the entire state
    setGraphState: (state, action: PayloadAction<GraphState>) => {
      return action.payload; // Replace the entire state with the new state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(undo, (state, action) => {
        // When undo is dispatched, update the graph state with the previous state
        const previousState = action.payload;
        return previousState;
      })
      .addCase(redo, (state, action) => {
        // When redo is dispatched, update the graph state with the next state
        const nextState = action.payload;
        return nextState;
      });
  },
});

export const { updateNodeColor, updateNodeFontSize, updateNodePosition, setGraphState } = graphSlice.actions;
export default graphSlice.reducer;
