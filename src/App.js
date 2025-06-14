import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import ControlPanel from './components/ControlPanel';
import { bfs } from './algorithms/bfs';
import { dfs } from './algorithms/dfs';
import { astar } from './algorithms/astar';
import { dijkstra } from './algorithms/dijkstra';

function App() {
  const gridSize = 10;
  const [start, setStart] = useState(null);
  const [goal, setGoal] = useState(null);
  const [obstacles, setObstacles] = useState([]);
  const [mode, setMode] = useState('start');
  const [algo, setAlgo] = useState('');
  const [path, setPath] = useState([]);

  const handleCellClick = (x, y) => {
    const pos = [x, y];
    if (mode === 'start') setStart(pos);
    else if (mode === 'goal') setGoal(pos);
    else if (mode === 'obstacle') {
      const exists = obstacles.some(([ox, oy]) => ox === x && oy === y);
      if (!exists) setObstacles([...obstacles, pos]);
    }
  };

  const startSimulation = () => {
    if (!start || !goal) {
      alert('Please set both start and goal points!');
      return;
    }

    let path = [];

    if (algo === 'bfs') path = bfs(start, goal, obstacles, gridSize);
    else if (algo === 'dfs') path = dfs(start, goal, obstacles, gridSize);
    else if (algo === 'astar') path = astar(start, goal, obstacles, gridSize);
    else if (algo === 'dijkstra') path = dijkstra(start, goal, obstacles, gridSize);

    animatePath(path);
  };

  const animatePath = (path) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= path.length) return clearInterval(interval);
      setPath(path.slice(0, i + 1));
      i++;
    }, 100);
  };

  return (
    <div className="App">
      <h1>Robot Pathfinding Simulator</h1>
      <ControlPanel
        setMode={setMode}
        setAlgo={setAlgo}
        algo={algo}
        startSimulation={startSimulation}
      />
      <Grid
        gridSize={gridSize}
        start={start}
        goal={goal}
        obstacles={obstacles}
        path={path}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

export default App;
