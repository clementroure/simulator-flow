"use client";

import { ReactFlowProvider } from "reactflow";

import Flow from "../components/reactflow/flow";
import NodeSidebar from "../components/reactflow/nodesidebar";

import "./styles.css";

import { useEffect } from "react";
import AuthenticationPage from "@/pages/auth/authPage";
import { useSession } from "next-auth/react";

export default function IndexPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session, status);
  }, [session, status]);

  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    // User is logged in, show the main content
    return (
      <ReactFlowProvider>
        <div className="flex h-screen">
          <NodeSidebar onDragStart={onDragStart} className="h-full w-64" />
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
