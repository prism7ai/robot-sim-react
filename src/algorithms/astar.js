export function astar(start, goal, obstacles, size) {
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
