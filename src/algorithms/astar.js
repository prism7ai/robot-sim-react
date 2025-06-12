export function astar(start, goal, obstacles, size) {
  console.log("start", start); // Add this at the top of astar and bug2

if (!Array.isArray(start)) {
  throw new Error("Start must be an array like [x, y]");
}

  // Simple dummy straight line path (replace with real A* later)
  let path = [];
  let [x, y] = start;
  const [gx, gy] = goal;
  while (x !== gx || y !== gy) {
    if (x < gx) x++;
    else if (x > gx) x--;
    else if (y < gy) y++;
    else if (y > gy) y--;
    path.push([x, y]);
  }
  return path;
}
