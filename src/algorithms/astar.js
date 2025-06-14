export function astar(start, goal, obstacles, gridSize) {
  const isValid = (x, y) => (
    x >= 0 && x < gridSize && y >= 0 && y < gridSize &&
    !obstacles.some(([ox, oy]) => ox === x && oy === y)
  );

  const heuristic = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

  const openSet = [start];
  const cameFrom = {};
  const gScore = {};
  const fScore = {};
  const key = ([x, y]) => `${x},${y}`;

  gScore[key(start)] = 0;
  fScore[key(start)] = heuristic(start, goal);

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[key(a)] - fScore[key(b)]);
    const current = openSet.shift();
    if (current[0] === goal[0] && current[1] === goal[1]) {
      let path = [current];
      while (key(path[0]) in cameFrom) {
        path.unshift(cameFrom[key(path[0])]);
      }
      return path;
    }

    const [x, y] = current;
    for (const [dx, dy] of [[1,0], [-1,0], [0,1], [0,-1]]) {
      const neighbor = [x + dx, y + dy];
      if (!isValid(...neighbor)) continue;

      const tentativeG = (gScore[key(current)] ?? Infinity) + 1;
      if (tentativeG < (gScore[key(neighbor)] ?? Infinity)) {
        cameFrom[key(neighbor)] = current;
        gScore[key(neighbor)] = tentativeG;
        fScore[key(neighbor)] = tentativeG + heuristic(neighbor, goal);
        if (!openSet.some(n => key(n) === key(neighbor))) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return []; // no path found
}
