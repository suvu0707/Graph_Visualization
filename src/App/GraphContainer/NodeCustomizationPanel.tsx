// NodeCustomizationPanel.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNodeColor, updateNodeFontSize } from '../../redux/slices/graphSlice.tsx';
import { record } from '../../redux/slices/historySlice.tsx'; 
import ColorPicker from '../ColorPicker.tsx';
import FontSizeControl from '../FontSizeControl.tsx';

// Define types for props and Redux state
interface NodeCustomizationPanelProps {
    selectedNode: {
        id: string;
        data?: {
            color?: string;
            fontSize?: number;
        };
    };
}

interface GraphState {
    nodes: {
        id: string;
        data: {
            color?: string;
            fontSize?: number;
        };
    }[];
}

interface HistoryState {
    present: any[]; 
}

const NodeCustomizationPanel: React.FC<NodeCustomizationPanelProps> = ({ selectedNode }) => {
    const dispatch = useDispatch();
    const nodes = useSelector<GraphState, GraphState['nodes']>((state) => state.graph.nodes);  
    const history = useSelector<HistoryState, HistoryState>((state) => state.history);  

    console.log("historynodes", history, nodes);

    const handleColorChange = (color: { hex: string }) => {
        const updatedNode = { id: selectedNode.id, color: color.hex };
        dispatch(updateNodeColor(updatedNode));
        const updatedNodesArray = nodes.map((node) =>
            node.id === selectedNode.id
                ? { ...node, data: { ...node.data, color: color.hex } } // Update the color for the selected node
                : node
        );
        dispatch(record(updatedNodesArray));  // Save the updated state before performing the update
    };

    const handleFontSizeChange = (fontSize: number) => {
        const updatedNode = { id: selectedNode.id, fontSize };
        dispatch(updateNodeFontSize(updatedNode));
        const updatedNodesArray = nodes.map((node) =>
            node.id === selectedNode.id
                ? { ...node, data: { ...node.data, fontSize: fontSize } } // Update the font size for the selected node
                : node
        );
        dispatch(record(updatedNodesArray));  // Save the updated state before performing the update
    };

    return (
        <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>Customize Node</h3>
            <ColorPicker selectedColor={selectedNode.data?.color} onColorChange={handleColorChange} />
            <br />
            <FontSizeControl selectedFontSize={selectedNode.data?.fontSize} onFontSizeChange={handleFontSizeChange} />
        </div>
    );
};

export default NodeCustomizationPanel;
