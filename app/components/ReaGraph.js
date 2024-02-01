"use client";

import React from 'react';
import { useCollapse } from 'reagraph';
import { getVisibleEntities } from 'reagraph';
import { GraphCanvas } from 'reagraph';
import "./styles/ReaGraph.css"

const nodes = [
  {
      id: '1',
      label: '1'
  },
  {
    id: '2',
    label: '2'
  },
  {
    id: '3',
    label: '3'
  },
  {
    id: '4',
    label: '4'
  },
  {
    id: '5',
    label: '5'
  }
];

// collapse can only work with 1 way
const edges = [
  {
    source: '1',
    target: '2',
    id: '1-2',
    label: '1-2'
  },
  {
    source: '2',
    target: '3',
    id: '2-3',
    label: '2-3'
  },
  {
    source: '3',
    target: '4',
    id: '3-4',
    label: '3-4'
  }
];

export const MyReaGraph = () => {
  const [active, setActive] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(['n-2']);
  const {
    getExpandPathIds
  } = useCollapse({
    collapsedNodeIds: collapsed,
    nodes: nodes,
    edges: edges
  });
  const hiddenNodeIds = React.useMemo(() => {
    const {
      visibleNodes
    } = getVisibleEntities({
      collapsedIds: collapsed,
      nodes: nodes,
      edges: edges
    });
    const visibleNodeIds = visibleNodes.map(n => n.id);
    const hiddenNodes = nodes.filter(n => !visibleNodeIds.includes(n.id));
    return hiddenNodes.map(n => n.id);
  }, [collapsed]);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
    <div style={{
      zIndex: 9,
      position: 'absolute',
      top: 15,
      right: 15,
      background: 'rgba(0, 0, 0, .5)',
      padding: 10,
      color: 'white'
    }}>
      <h3>Node Actions</h3>
      {active ? <>
          Selected: {active.node.id}
          <br />
          <button style={{
          display: 'block',
          width: '100%'
        }} onClick={() => {
          if (!collapsed.includes(active.node.id)) {
            setCollapsed([...collapsed, active.node.id]);
          }
        }}>
            Collapse Node
          </button>
          <button style={{
          display: 'block',
          width: '100%'
        }} onClick={() => {
          if (collapsed.includes(active.node.id)) {
            setCollapsed(collapsed.filter(n => n !== active.node.id));
          }
        }}>
            Expand Node
          </button>
        </> : <>
          Click a node to see options
        </>}
      <h3>Collapsed Nodes</h3>
      <code>
        <pre>
          {JSON.stringify(collapsed, null, 2)}
        </pre>
      </code>
      <h3>Hidden Nodes</h3>
      <ul>
        {hiddenNodeIds.map(id => <li key={id}>
            {id}
            <button style={{
            display: 'block',
            width: '100%'
          }} onClick={() => {
            const toExpandIds = getExpandPathIds(id);
            const newCollapsed = collapsed.filter(id => !toExpandIds.includes(id));
            setCollapsed(newCollapsed);
          }}>
              View Node
            </button>
          </li>)}
      </ul>
    </div>
    <GraphCanvas collapsedNodeIds={collapsed} nodes={nodes} edges={edges} onNodeClick={(node, props) => setActive({
      node,
      props
    })} />
    </div>;
}