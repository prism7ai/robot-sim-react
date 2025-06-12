export function bug2(start, goal, obstacles, size) {
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

  while (x < gx) {
    path.push([x, y]);
    x++;
  }

  while (y < gy) {
    path.push([x, y]);
    y++;
  }

  return path;
}
