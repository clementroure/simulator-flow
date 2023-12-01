"use client"

import { ReactFlowProvider } from "reactflow";
import Flow from "../components/reactflow/flow";
import NodeSidebar from "../components/reactflow/nodesidebar";
import "./styles.css"
import { useSession } from "next-auth/react";
import AuthenticationPage from "@/pages/auth/authPage";
import { useEffect } from "react";

export default function IndexPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session, status)
  },[session, status]);

  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  if (status === "authenticated") {
    // User is logged in, show the main content
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
  } else {
    // User is not logged in, show the LoginPage
    return <AuthenticationPage />;
  }
}