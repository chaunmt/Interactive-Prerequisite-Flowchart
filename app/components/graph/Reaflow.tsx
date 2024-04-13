"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Canvas, NodeProps, Node, NodeData, EdgeData } from "reaflow";

export default function Reaflow({ nodes, edges }) {
  const [l_nodes, setNodes] = useState<NodeData[]>(nodes);
  const [l_edges, setEdges] = useState<EdgeData[]>(edges);
  // const [didMount, setDidMount] = useState(false);

  // useEffect(() => {
  //   if (!didMount) return;

  //   const generateGraph = async () => {}
  // }, [didMount, graph]);

  // useEffect(() => {
  //     setDidMount(true);
  //   }, []);

  // look further into Canvas layoutOptions={{}} with custom layout options
  return (
    <div className="reaflow">
      <Canvas
        nodes={nodes}
        edges={edges}
        animated={false}
        pannable={false}
        readonly={true}
        layoutOptions={{
          "elk.nodeLabels.placement": "INSIDE V_CENTER H_RIGHT",
          "elk.algorithm": "org.eclipse.elk.layered",
          "elk.direction": "DOWN",
          nodeLayering: "INTERACTIVE",
          "org.eclipse.elk.edgeRouting": "ORTHOGONAL",
          "elk.layered.unnecessaryBendpoints": "true",
          "elk.layered.spacing.edgeNodeBetweenLayers": "20",
          "org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
          "org.eclipse.elk.layered.cycleBreaking.strategy": "DEPTH_FIRST",
          "org.eclipse.elk.insideSelfLoops.activate": "true",
          separateConnectedComponents: "false",
          "spacing.componentComponent": "20",
          spacing: "25",
          "spacing.nodeNodeBetweenLayers": "20",
        }}
        node={(node: NodeProps) => (
          <Node {...node} onClick={() => console.log(node.properties.text)} />
        )}
      />
    </div>
  );
}
