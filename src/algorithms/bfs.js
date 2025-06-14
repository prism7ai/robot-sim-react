export function bfs(start, goal, obstacles, gridSize) {
  const queue = [start];
  const visited = new Set();
  const parentMap = new Map();

  const key = (x, y) => `${x},${y}`;
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ];

  const isValid = (x, y) => {
    return (
      x >= 0 && y >= 0 &&
      x < gridSize && y < gridSize &&
      !obstacles.some(([ox, oy]) => ox === x && oy === y)
    );
  };

  visited.add(key(...start));

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === goal[0] && y === goal[1]) {
      let path = [];
      let curr = key(x, y);
      while (curr !== key(...start)) {
        const [px, py] = parentMap.get(curr);
        path.unshift([parseInt(curr.split(',')[0]), parseInt(curr.split(',')[1])]);
        curr = key(px, py);
      }
      return path;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx, ny = y + dy;
      const neighborKey = key(nx, ny);
      if (isValid(nx, ny) && !visited.has(neighborKey)) {
        queue.push([nx, ny]);
        visited.add(neighborKey);
        parentMap.set(neighborKey, [x, y]);
      }
    }
  }

  return []; // No path found
}
