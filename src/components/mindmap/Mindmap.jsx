// Remove the export statements for initialNodes and initialEdges
import Dagre from "@dagrejs/dagre";
import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import TextUpdaterNode from "./TextUpdaterNode";
import DownloadButton from "./DownloadButton"; // Assuming both are in the same folder
import "reactflow/dist/style.css";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
const nodeTypes = { textUpdater: TextUpdaterNode };
const LayoutFlow = ({ initialNodes, initialEdges }) => {
  const ref = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
    },
    [nodes, edges]
  );
  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.click();
      }
    }, 1);
  }, []);

  return (
    <div style={{ width: "90vw", height: "80vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel position="top-right">
          <button onClick={() => onLayout("TB")} ref={ref}>
            vertical layout
          </button>
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        <DownloadButton />
      </ReactFlow>
    </div>
  );
};

const Mindmap = ({ initialNodes, initialEdges }) => {
  return (
    <ReactFlowProvider>
      <LayoutFlow initialNodes={initialNodes} initialEdges={initialEdges} />
    </ReactFlowProvider>
  );
};

export default Mindmap;
