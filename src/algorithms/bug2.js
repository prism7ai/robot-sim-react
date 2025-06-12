export function bug2(start, goal, obstacles, size) {
  // Check if start and goal are arrays of two numbers
  if (!Array.isArray(start) || start.length !== 2 || !Array.isArray(goal) || goal.length !== 2) {
    throw new Error("Invalid start or goal position");
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
