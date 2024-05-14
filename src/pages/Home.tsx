import Mindmap from "../components/mindmap/Mindmap.jsx";
import React, { useState } from "react";
import ReactFlow, { Node, Edge } from "reactflow";

const Home = () => {
  // Define initialNodes and initialEdges as state variables
  const [initialNodes, setInitialNodes] = useState<Node[]>([
    {
      id: "node-1",
      type: "textUpdater",
      position: { x: 100, y: 100 },
      data: { title: 123, type: "Project" },
    },
    {
      id: "node-2",
      type: "textUpdater",
      position: { x: 100, y: 100 },
      data: {
        title: "node",
        type: "Project",
      },
    },
    {
      id: "node-3",
      type: "textUpdater",
      position: { x: 100, y: 100 },
      data: {
        title: "node",
        type: "Project",
      },
    },
  ]);

  const [initialEdges, setInitialEdges] = useState<Edge[]>([
    {
      id: "edge-1",
      source: "node-1",
      target: "node-2",
    },
    {
      id: "edge-2",
      source: "node-1",
      target: "node-3",
    },
  ]);

  return (
    <>
      <p>hhh</p>
    </>
  );
};

export default Home;
