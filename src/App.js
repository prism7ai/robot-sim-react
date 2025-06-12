import React, { useState } from 'react';
import Grid from './Grid';
import ControlPanel from './ControlPanel';
import { astar } from './algorithms/astar';
import { bug2 } from './algorithms/bug2';

export default function App() {
  const [gridSize, setGridSize] = useState(10);
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(null);
  const [goal, setGoal] = useState(null);
  const [obstacles, setObstacles] = useState([]);
  const [algo, setAlgo] = useState('astar');

  const handleCellClick = (x, y) => {
    if (!start) setStart([x, y]);
    else if (!goal) setGoal([x, y]);
    else setObstacles([...obstacles, [x, y]]);
  };

 const startSimulation = () => {
  if (!Array.isArray(start) || !Array.isArray(goal)) {
    alert("Please select both a start and a goal cell before starting the simulation.");
    return;
  }

  let path = algo === 'astar'
    ? astar(start, goal, obstacles, gridSize)
    : bug2(start, goal, obstacles, gridSize);

  animatePath(path);
};

  const animatePath = (path) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= path.length) return clearInterval(interval);
      setGrid((g) => {
        const newGrid = [...Array(gridSize)].map(() => Array(gridSize).fill(''));
        for (const [x, y] of obstacles) newGrid[x][y] = 'obstacle';
        newGrid[start[0]][start[1]] = 'start';
        newGrid[goal[0]][goal[1]] = 'goal';
        const [x, y] = path[i];
        newGrid[x][y] = 'robot';
        return newGrid;
      });
      i++;
    }, 200);
  };

  return (
    <div>
      <h2>Robot Pathfinding Simulator</h2>
      <ControlPanel algo={algo} setAlgo={setAlgo} startSimulation={startSimulation} />
      <Grid
        gridSize={gridSize}
        grid={grid}
        onCellClick={handleCellClick}
      />
    </div>
  );
}
