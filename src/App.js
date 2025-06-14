import React, { useState } from 'react';
import Grid from './Grid';
import ControlPanel from './ControlPanel';
import { bfs } from './algorithms/bfs';
import { dfs } from './algorithms/dfs';

export default function App() {
  const [gridSize] = useState(10);
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(null);
  const [goal, setGoal] = useState(null);
  const [obstacles, setObstacles] = useState([]);
  const [algo, setAlgo] = useState('bfs');
  const [mode, setMode] = useState('start'); 

  const handleCellClick = (x, y) => {
    if (mode === 'start') setStart([x, y]);
    else if (mode === 'goal') setGoal([x, y]);
    else if (mode === 'obstacle') setObstacles([...obstacles, [x, y]]);
  };

  const startSimulation = () => {
  if (!start || !goal) {
    alert("Set both start and goal positions.");
    return;
  }

  let path = [];

  try {
    path = algo === 'bfs'
      ? bfs(start, goal, obstacles, gridSize)
      : dfs(start, goal, obstacles, gridSize);

    if (!Array.isArray(path)) {
      throw new Error("Algorithm did not return a path array");
    }
  } catch (error) {
    console.error("Simulation error:", error);
    alert("Pathfinding failed. Check console.");
    return;
  }

  animatePath(path);
};

  const animatePath = (path) => {
  if (!Array.isArray(path)) {
    console.error("Path is not an array:", path);
    return;
  }

  let i = 0;
  const interval = setInterval(() => {
    if (i >= path.length) {
      clearInterval(interval);
      return;
    }

    const point = path[i];
    if (!Array.isArray(point) || point.length !== 2) {
      console.warn("Invalid point in path at index", i, ":", point);
      i++;
      return;
    }

    const [x, y] = point;

    setGrid(() => {
      const newGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
      obstacles.forEach(([ox, oy]) => newGrid[ox][oy] = 'obstacle');
      if (start) newGrid[start[0]][start[1]] = 'start';
      if (goal) newGrid[goal[0]][goal[1]] = 'goal';
      newGrid[x][y] = 'robot';
      return newGrid;
    });

    i++;
  }, 150);
};

  return (
    <div>
      <h2>Robot Pathfinding Simulator</h2>
      <ControlPanel
        mode={mode}
        setMode={setMode}
        algo={algo}
        setAlgo={setAlgo}
        startSimulation={startSimulation}
      />
      <Grid
        gridSize={gridSize}
        grid={grid}
        onCellClick={handleCellClick}
      />
    </div>
  );
}
