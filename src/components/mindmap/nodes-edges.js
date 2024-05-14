export const initialNodes = [
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
];

export const initialEdges = [
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
];
