"use client"

import { ReactFlowProvider } from "reactflow";
import Flow from "../components/reactflow/flow";
import NodeSidebar from "../components/reactflow/nodesidebar";
import "./styles.css"

export default function IndexPage() {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-screen">
        <NodeSidebar onDragStart={onDragStart} className="w-64 h-full" />
        <div className="w-0.5 bg-gray-600"></div>
        <div className="flex-1">
          <Flow />
        </div>
      </div>
    </ReactFlowProvider>
  );
}