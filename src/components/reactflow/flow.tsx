"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Edge,
  Node,
  useUpdateNodeInternals,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { toPng } from 'html-to-image';
import { useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { Button } from '../ui/button';
import CustomNode from './customNode';
import StartNode from './startNode';
import useStore from '@/store';

const initialNodes: Node[] = [
  {
    id: '0',
    type: 'startNode', // Custom type for the "START" node
    data: { label: 'START' },
    position: { x: 0, y: 0 },
    deletable: false,
    selectable: false,
  },
  /* {
    id: '2',
    type: "output",
    data: { label: 'END' },
    position: { x: 0, y: 300 },
    deletable: false,
    selectable: false,
  }, */
];

const initialEdges: Edge[] = [
  // { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step', animated: true},
];

const nodeTypes = {
  abiNode: CustomNode,
  startNode: StartNode,
};

function Flow() {
  const { graphData, setGraphData } = useStore();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null); // Add state for tracking the selected edge

  const { getNodes } = useReactFlow();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();

  const onDrop = useCallback((event: any) => {
    event.preventDefault();
  
    if (reactFlowWrapper.current && reactFlowInstance) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const abiItemString = event.dataTransfer.getData('application/reactflow');
      const abiItem = JSON.parse(abiItemString);
  
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
  
      
      const newNode = {
        id: Date.now().toString(),
        type: 'abiNode', // Ensure this matches your custom node type
        position,
        data: { 
          label: abiItem.name || 'Unnamed',
          details: abiItem, // Pass the ABI data here
        },
      };
  
      setNodes((nds) => nds.concat(newNode));
    }
  }, [reactFlowInstance]);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback((changes: any) => {
    // Detect if an edge is selected
    const selectedEdge = changes.find((change:any) => change.selected);
    if (selectedEdge) {
      setSelectedEdgeId(selectedEdge.id);
    } else {
      setSelectedEdgeId(null);
    }
    
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);
  const onConnect = useCallback((params: any) => {
    const newEdge = {
      ...params,
      animated: true, 
    };
    // Check if the source or target is already connected
    const isAlreadyConnected = edges.some(
      (edge) =>
        (edge.source === params.source && edge.sourceHandle === params.sourceHandle) ||
        (edge.target === params.target && edge.targetHandle === params.targetHandle)
    );

    if (!isAlreadyConnected) {
      // If not already connected, add the new edge
      setEdges((eds) => addEdge(newEdge, eds));
    } else {
      // Optionally, alert the user that the connection exists
      alert('This connection already exists.');
    }
  }, [edges]);

  const downloadImage = useCallback((dataUrl: string) => {
    const a = document.createElement('a');
    a.setAttribute('download', 'reactflow.png');
    a.setAttribute('href', dataUrl);
    a.click();
  }, []);

  const onDownload = useCallback(() => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, 1024, 768, 0.5, 2);
  
    const flowViewportElement = document.querySelector('.react-flow__viewport');
  
    if (flowViewportElement instanceof HTMLElement) {
      toPng(flowViewportElement, {
        backgroundColor: '#fff',
        width: 1024,
        height: 768,
        style: {
          width: '1024px',
          height: '768px',
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
      }).then(downloadImage)
      .catch(err => console.error('Error while downloading the image:', err));
    }
  }, [getNodes, downloadImage]);


    // Function to update the graph data state
    const updateGraphData = (newData: any) => {
      setGraphData(newData);
    };
    
    // Update graph data whenever nodes or edges change
    useEffect(() => {
      updateGraphData({ nodes, edges });
    }, [nodes, edges]);

    // Print the graph data to the console (or display it in the UI)
    useEffect(() => {
      console.log("Current Graph Data:", graphData);
    }, [graphData]);

    
    const handleCustomNodeInputChange = useCallback((nodeId: any, inputIndex: any, value: any) => {
      setNodes(currentNodes => currentNodes.map(node => {
        if (node.id === nodeId) {
          // Clone the inputs array
          const updatedInputs = [...node.data.details.inputs];
          // Update the specific input's name
          updatedInputs[inputIndex] = { ...updatedInputs[inputIndex], name: value };
    
          // Return the updated node
          return {
            ...node,
            data: {
              ...node.data,
              details: {
                ...node.data.details,
                inputs: updatedInputs,
              },
            },
          };
        }
        return node;
      }));
    }, []);

    const nodeTypes = useMemo(() => ({
      abiNode: (props: any) => <CustomNode {...props} onInputChange={handleCustomNodeInputChange}/>,
      startNode: StartNode,
    }), [handleCustomNodeInputChange]);

  return (
    <div ref={reactFlowWrapper} style={{ height: '100%' }} onDrop={onDrop} onDragOver={(event) => event.preventDefault()}>
    <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges.map(edge => ({
          ...edge,
          style: { stroke: edge.id === selectedEdgeId ? 'blue' : '#222' } // Change the stroke color based on selection
        }))}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background && typeof n.style.background === 'string') {
              return n.style.background; // Ensuring it's a string
            }
            if (n.type === "startNode") return "#90EE90"; // Example color for 'input' type nodes
            if (n.type === "output") return "#FFA07A"; // Example color for 'output' type nodes
            if (n.type === "default") return "#1a192b"; // Example color for 'default' type nodes
        
            return "#eee"; // Default color
          }}
          nodeColor={(n) => {
            if (n.style?.background && typeof n.style.background === 'string') {
              return n.style.background;
            }
            if (n.type === "startNode") return "#90EE90";
            if (n.type === "output") return "#FFA07A";
            if (n.type === "default") return "#1a192b";
          
            return "#eee";
          }}          
          nodeBorderRadius={2}
        />
        <Controls />
      </ReactFlow>
      <Button variant="secondary" onClick={onDownload} style={{ position: 'absolute', top: 10, right: 10 }}>
        Download as Image
      </Button>
    </div>
  );
}

export default Flow;