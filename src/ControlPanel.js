import React from 'react';

export default function ControlPanel({
  mode,
  setMode,
  algo,
  setAlgo,
  startSimulation
}) {
  const isActive = (val, type) => (
    (type === 'mode' && mode === val) || (type === 'algo' && algo === val)
      ? { backgroundColor: '#2c3e50', color: 'white' }
      : {}
  );

  return (
    <div style={{
      padding: '20px',
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <button style={isActive('start', 'mode')} onClick={() => setMode('start')}>Set Start</button>
        <button style={isActive('goal', 'mode')} onClick={() => setMode('goal')}>Set Goal</button>
        <button style={isActive('obstacle', 'mode')} onClick={() => setMode('obstacle')}>Add Obstacle</button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button style={isActive('bfs', 'algo')} onClick={() => setAlgo('bfs')}>BFS</button>
        <button style={isActive('dfs', 'algo')} onClick={() => setAlgo('dfs')}>DFS</button>
      </div>

      <button style={{
        padding: '10px 20px',
        backgroundColor: '#0c1b2c',
        color: 'white',
        borderRadius: '4px',
        border: 'none'
      }} onClick={startSimulation}>Simulate</button>
    </div>
  );
}
