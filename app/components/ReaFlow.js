'use client';

import React, { useState } from 'react';
import { Canvas, NodeProps, EdgeProps, Node, Edge, Port } from 'reaflow';
import "./styles/ReaFlow.css"

const nodes = [{
  id: '1',
  text: 'Node 1'
}, {
  id: '2',
  text: 'Node 2'
}]

const edges = [{
  id: '1-2',
  from: '1',
  to: '2'
}]

export const MyDiagram = () => 
<div>
    <Canvas 
      nodes = {nodes} 
      edges = {edges} 
      node={
        <Node port = 
          {<Port 
            onEnter={(event, port) => {
              console.log('Enter Port', event, port);
            }}
            onLeave={(event, port) => {
              console.log('Leave Port', event, port);
            }} 
          />}
          onEnter={(event, node) => {
            console.log('Enter Node', event, node);
            node.className = "node-selected"
          }} 
          onLeave={(event, node) => {
            console.log('Leave Node', event, node);
            node.className = "node"
          }} 
          onKeyDown={(event, node) => {
            console.log('Keydown Node', event, node);
          }} 
          onClick={(event, node) => {
            console.log('Selecting Node', event, node);
          }} 
          onRemove={(event, node) => {
            console.log('Remove Node', event, node);
          }} 
        />
      } 
      edge={
        <Edge 
          onEnter={(event, edge) => {
            console.log('Enter Edge', event, edge);
          }} 
          onLeave={(event, edge) => {
            console.log('Leave Edge', event, edge);
          }} 
          onKeyDown={(event, edge) => {
            console.log('Keydown Edge', event, edge);
          }} 
          onClick={(event, edge) => {
            console.log('Selecting Edge', event, edge);
          }} 
          onRemove={(event, edge) => {
            console.log('Removing Edge', event, edge);
          }} 
        />
      } 
      onCanvasClick={event => {
        console.log('Canvas Clicked', event);
      }} 
      onLayoutChange={layout => 
        console.log('Layout', layout)} 
    />
  </div>