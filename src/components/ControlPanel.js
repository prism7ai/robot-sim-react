import React from 'react';

export default function ControlPanel({ setMode, setAlgo, startSimulation, algo, onClear, onExport, onExportGrid }) {


  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      gap: '10px', 
      justifyContent: 'center', 
      margin: '20px 0'
    }}>
      <button onClick={() => setMode('start')}>Set Start</button>
      <button onClick={() => setMode('goal')}>Set Goal</button>
      <button onClick={() => setMode('obstacle')}>Add Obstacle</button>

      <button
        onClick={() => setAlgo('bfs')}
        style={{ backgroundColor: algo === 'bfs' ? '#4caf50' : '' }}
      >BFS</button>

      <button
        onClick={() => setAlgo('dfs')}
        style={{ backgroundColor: algo === 'dfs' ? '#4caf50' : '' }}
      >DFS</button>

      <button
        onClick={() => setAlgo('astar')}
        style={{ backgroundColor: algo === 'astar' ? '#4caf50' : '' }}
      >A*</button>

      <button
        onClick={() => setAlgo('dijkstra')}
        style={{ backgroundColor: algo === 'dijkstra' ? '#4caf50' : '' }}
      >Dijkstra</button>

      <button onClick={startSimulation} style={{ fontWeight: 'bold' }}>Simulate</button>
      <button onClick={onClear} style={{ backgroundColor: '#ff4d4d', color: 'white' }}>
  Clear Grid
</button>
<button onClick={onExport} style={{ backgroundColor: '#607d8b', color: 'white' }}>
  Export JSON
</button>

<button onClick={onExportGrid} style={{ backgroundColor: '#795548', color: 'white' }}>
    Export Grid as Image
  </button>

    </div>
  );
}
