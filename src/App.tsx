import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GraphContainer from './App/GraphContainer/GraphContainer.tsx';
import NodeCustomizationPanel from './App/GraphContainer/NodeCustomizationPanel.tsx';
import UndoRedoControls from './App/GraphContainer/UndoRedoControls.tsx';
import './App.css';

interface Node {
  id: string;
  position: { x: number; y: number };
  data: { label: string; color: string; fontSize: number };
  style: { border: string; fontSize: number };
}

const App = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null); 
  const nodes = useSelector((state: any) => state.graph.nodes);
  const edges = useSelector((state: any) => state.graph.edges);
  const dispatch = useDispatch();

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    console.log('clickedNode', node);
    setSelectedNode(node);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 4 }}>
        <GraphContainer
          nodes={nodes}
          edges={edges}
          onNodeClick={handleNodeClick}
        />
      </div>
      <div style={{ flex: 1, borderLeft: '1px solid #ccc', padding: '10px' }}>
        <NodeCustomizationPanel selectedNode={selectedNode || {}} />
        <br />
        <UndoRedoControls />
      </div>
    </div>
  );
};

export default App;
