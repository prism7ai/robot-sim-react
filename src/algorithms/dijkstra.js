export function dijkstra(start, goal, obstacles, gridSize) {
  const key = ([x, y]) => `${x},${y}`;

  const isValid = (x, y) =>
    x >= 0 && x < gridSize &&
    y >= 0 && y < gridSize &&
    !obstacles.some(([ox, oy]) => ox === x && oy === y);

  const directions = [
    [1, 0], [-1, 0], [0, 1], [0, -1]
  ];

  const distance = {};
  const parent = {};
  const visited = new Set();
  const queue = [];

  distance[key(start)] = 0;
  queue.push({ pos: start, dist: 0 });

  while (queue.length > 0) {
    // Sort by distance (priority queue)
    queue.sort((a, b) => a.dist - b.dist);
    const { pos: [x, y], dist } = queue.shift();

    if (visited.has(key([x, y]))) continue;
    visited.add(key([x, y]));

    if (x === goal[0] && y === goal[1]) {
      // Reconstruct path
      let path = [[x, y]];
      while (key(path[0]) in parent) {
        path.unshift(parent[key(path[0])]);
      }
      return path;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx, ny = y + dy;
      const nKey = key([nx, ny]);

      if (!isValid(nx, ny) || visited.has(nKey)) continue;

      const newDist = dist + 1;
      if (distance[nKey] === undefined || newDist < distance[nKey]) {
        distance[nKey] = newDist;
        parent[nKey] = [x, y];
        queue.push({ pos: [nx, ny], dist: newDist });
      }
    }
  }

  return []; // No path found
}
