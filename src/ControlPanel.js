import React from 'react';

export default function ControlPanel({ algo, setAlgo, startSimulation }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Algorithm: </label>
      <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
        <option value="astar">A*</option>
        <option value="bug2">Bug2</option>
      </select>
      <button onClick={startSimulation} style={{ marginLeft: '1rem' }}>
        Start Simulation
      </button>
    </div>
  );
}
