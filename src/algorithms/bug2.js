export function bug2(start, goal, obstacles, size) {
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
