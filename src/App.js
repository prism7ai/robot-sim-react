
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
  const [visited, setVisited] = useState([]);
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

    let result = { visited: [], path: [] };
    if (algo === 'bfs') result = bfs(start, goal, obstacles, gridSize);
    else if (algo === 'dfs') result = dfs(start, goal, obstacles, gridSize);
    else if (algo === 'astar') result = astar(start, goal, obstacles, gridSize);
    else if (algo === 'dijkstra') result = dijkstra(start, goal, obstacles, gridSize);

    animateExploration(result.visited, result.path);
  };

  const animateExploration = (visitedNodes, finalPath) => {
    let i = 0;
    const exploreInterval = setInterval(() => {
      if (i >= visitedNodes.length) {
        clearInterval(exploreInterval);
        animatePath(finalPath);
        return;
      }
      setVisited(visitedNodes.slice(0, i + 1));
      i++;
    }, 50);
  };

  const animatePath = (finalPath) => {
    let i = 0;
    const pathInterval = setInterval(() => {
      if (i >= finalPath.length) return clearInterval(pathInterval);
      setPath(finalPath.slice(0, i + 1));
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
        visited={visited}
        onCellClick={handleCellClick}
      />
      <div style={{ marginTop: '20px' }}>
        <p><strong>Explored Nodes:</strong> {visited.length}</p>
        <p><strong>Shortest Path Length:</strong> {path.length}</p>
      </div>
    </div>
  );
}

export default App;
