"use client"

import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { toPng } from 'html-to-image';
import { useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { Button } from '../ui/button';
import CustomNode from './customNode';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: "output",
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

const initialEdges: Edge[] = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step', animated: true},
];

const nodeTypes = { abiNode: CustomNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback((params: any) => {
    const newEdge = {
      ...params,
      animated: true, 
    };
  
    setEdges((eds) => addEdge(newEdge, eds));
  }, []);

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

  return (
    <div ref={reactFlowWrapper} style={{ height: '100%' }} onDrop={onDrop} onDragOver={(event) => event.preventDefault()}>
    <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
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
            if (n.type === "input") return "#0041d0"; // Example color for 'input' type nodes
            if (n.type === "output") return "#ff0072"; // Example color for 'output' type nodes
            if (n.type === "default") return "#1a192b"; // Example color for 'default' type nodes
        
            return "#eee"; // Default color
          }}
          nodeColor={(n) => {
            if (n.style?.background && typeof n.style.background === 'string') {
              return n.style.background;
            }
            if (n.type === "input") return "#0041d0";
            if (n.type === "output") return "#ff0072";
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