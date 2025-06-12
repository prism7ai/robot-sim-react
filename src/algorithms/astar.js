export function astar(start, goal, obstacles, size) {
  console.log("Start:", start, "Goal:", goal);
  if (!Array.isArray(start) || start.length !== 2) {
  throw new Error("Invalid start position. Expected [x, y]");
}
if (!Array.isArray(goal) || goal.length !== 2) {
  throw new Error("Invalid goal position. Expected [x, y]");
}

  let path = [];
let [x, y] = start;
const [gx, gy] = goal;


  while (x !== gx || y !== gy) {
    if (x < gx) x++;
    else if (x > gx) x--;

    if (y < gy) y++;
    else if (y > gy) y--;

    path.push([x, y]);
  }

  return path;
}

