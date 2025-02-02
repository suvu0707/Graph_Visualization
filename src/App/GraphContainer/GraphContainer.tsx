// GraphContainer.tsx
import React, { useCallback, useMemo } from 'react';
import ReactFlow, { addEdge, Node, Edge, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateNodePosition } from '../../redux/slices/graphSlice.tsx';

// Define types for props and Redux state
interface GraphContainerProps {
    onNodeClick: (event: React.MouseEvent, node: Node) => void;
}

interface GraphState {
    nodes: Node[];
    edges: Edge[];
}

interface HistoryState {
    present: Node[];
}

const GraphContainer: React.FC<GraphContainerProps> = ({ onNodeClick }) => {
    // Define typed states from Redux store
    const nodes = useSelector<GraphState, Node[]>((state) => state.graph.nodes);
    const edges = useSelector<GraphState, Edge[]>((state) => state.graph.edges);
    const history = useSelector<HistoryState, HistoryState>((state) => state.history);
    const dispatch = useDispatch();

    // Updated nodes array with type checks
    const updatedNodesArray = history.present && history.present.length > 0 
        ? nodes.map((node) => {
            const matchingHistoryNode = history.present.find((histNode) => histNode.id === node.id);
            return matchingHistoryNode ? matchingHistoryNode : node;
        })
        : nodes;

    console.log("updatedArr", updatedNodesArray, history.present);

    const onConnect = useCallback(
        (params: Connection) => {
            dispatch(addEdge(params, edges));
        },
        [dispatch, edges]
    );

    const onNodeDragStop = (event: React.DragEvent, node: Node) => {
        dispatch(updateNodePosition({ id: node.id, position: node.position }));
    };

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <ReactFlow
                nodes={updatedNodesArray}
                edges={edges}
                onNodeClick={onNodeClick}
                onConnect={onConnect}
                onNodeDragStop={onNodeDragStop}
                fitView
            />
        </div>
    );
};

export default GraphContainer;
