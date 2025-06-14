import React from 'react';

export default function ControlPanel({ setMode, setAlgo, startSimulation, algo }) {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      <button onClick={() => setMode('start')}>Set Start</button>
      <button onClick={() => setMode('goal')}>Set Goal</button>
      <button onClick={() => setMode('obstacle')}>Add Obstacle</button>

      <button
        onClick={() => setAlgo('bfs')}
        style={{ backgroundColor: algo === 'bfs' ? '#333' : '' }}
      >BFS</button>

      <button
        onClick={() => setAlgo('dfs')}
        style={{ backgroundColor: algo === 'dfs' ? '#333' : '' }}
      >DFS</button>

      <button
        onClick={() => setAlgo('astar')}
        style={{ backgroundColor: algo === 'astar' ? '#333' : '' }}
      >A*</button>

      <button
       onClick={() => setAlgo('dijkstra')} 
       style={{ backgroundColor: algo === 'dijkstra' ? '#333' : '' }}
      >Dijkstra</button>

      <button onClick={startSimulation}>Simulate</button>
    </div>
  );
}
