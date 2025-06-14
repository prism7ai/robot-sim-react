import React from 'react';

export default function Grid({ gridSize, grid, onCellClick }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 30px)` }}>
      {[...Array(gridSize)].map((_, x) =>
        [...Array(gridSize)].map((_, y) => {
          let color = 'white';
          const cell = grid[x]?.[y];
          if (cell === 'start') color = 'green';
          else if (cell === 'goal') color = 'red';
          else if (cell === 'obstacle') color = 'black';
          else if (cell === 'robot') color = '#87CEFA';

          return (
            <div key={`${x}-${y}`}
              onClick={() => onCellClick(x, y)}
              style={{
                width: 30,
                height: 30,
                border: '1px solid #ccc',
                backgroundColor: color
              }} />
          );
        })
      )}
    </div>
  );
}
