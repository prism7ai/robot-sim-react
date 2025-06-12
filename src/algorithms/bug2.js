export function bug2(start, goal, obstacles, size) {
  console.log("start", start); // Add this at the top of astar and bug2

if (!Array.isArray(start)) {
  throw new Error("Start must be an array like [x, y]");
}

  // Fake curved path to simulate bug2 logic
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
