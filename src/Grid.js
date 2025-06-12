import React from 'react';
import './App.css';

export default function Grid({ gridSize, grid, onCellClick }) {
  const renderGrid = () => {
    return [...Array(gridSize)].map((_, x) =>
      <div key={x} className="row">
        {[...Array(gridSize)].map((_, y) => {
          let cellType = grid[x]?.[y] || '';
          return (
            <div
              key={y}
              className={`cell ${cellType}`}
              onClick={() => onCellClick(x, y)}
            />
          );
        })}
      </div>
    );
  };

  return <div className="grid">{renderGrid()}</div>;
}
