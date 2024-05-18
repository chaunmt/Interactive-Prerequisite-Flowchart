"use client";
import React from "react";
import { useEffect, useState } from "react";
import buildGraph from "../../data/graphBuilder";
import { CourseShell } from "../../data/types";
import { AccessAll, isEqualCourses } from "../../data/access";
import { Canvas, NodeProps, Node } from "reaflow";

export default function Reaflow({ build }) {
  const { simplify, decimate_orphans } = build;
  const [l_incl, setIncludes] = useState<CourseShell[]>(build.includes);
  const [l_soft, setSoftcludes] = useState<CourseShell[]>(build.soft_excludes);
  const [l_hard, setHardcludes] = useState<CourseShell[]>(build.hard_excludes);

  const { nodes, edges } = buildGraph({
    includes: l_incl,
    soft_excludes: l_soft,
    hard_excludes: l_hard,
    simplify,
    decimate_orphans,
  });

  // TODO look further into Canvas layoutOptions={{}} with custom layout options
  return (
    <div className="reaflow">
      <Canvas
        nodes={nodes}
        edges={edges}
        animated={false}
        height={800}
        pannable={false}
        readonly={true}
        layoutOptions={{
          // "elk.nodeLabels.placement": "INSIDE V_CENTER H_RIGHT",
          // "elk.algorithm": "org.eclipse.elk.layered",
          // "elk.direction": "DOWN",
          // nodeLayering: "INTERACTIVE",
          // "org.eclipse.elk.edgeRouting": "ORTHOGONAL",
          // "elk.layered.unnecessaryBendpoints": "true",
          // "elk.layered.spacing.edgeNodeBetweenLayers": "20",
          // "org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
          // "org.eclipse.elk.layered.cycleBreaking.strategy": "DEPTH_FIRST",
          // "org.eclipse.elk.insideSelfLoops.activate": "true",
          // separateConnectedComponents: "false",
          // "spacing.componentComponent": "20",
          spacing: "25",
          // "spacing.nodeNodeBetweenLayers": "20",
        }}
        node={(node) => (
          <Node
            {...node}
            onClick={() => {
              let new_course = AccessAll.getCourse(node.id.replace("_", " "));
              let new_soft = [new_course, ...l_soft];
              if (l_soft.some((shell) => isEqualCourses(shell, new_course))) {
                setSoftcludes(
                  new_soft.filter(
                    (shell) => !isEqualCourses(shell, new_course),
                  ),
                );
              }
            }}
          />
        )}
      />
    </div>
  );
}
