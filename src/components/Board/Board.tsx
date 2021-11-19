import { useState, useEffect, useRef } from 'react';
import produce from 'immer';

import Cell from './Cell';
import Controls from './Controls';
import { generateInitialGrid, computeNextGrid, randomizeGrid } from './helpers';

const numRows = 30;
const numCols = 30;

export const Board = () => {
  const [board, setBoard] = useState(() => ({
    generations: 0,
    grid: generateInitialGrid(numRows, numCols),
  }));
  const [running, setRunning] = useState(false);

  const [timeBetweenSteps, setTimeBetweenSteps] = useState<number>(300);
  const intervalRef = useRef<NodeJS.Timeout | undefined>();

  const handleTimeBetweenStepsChange = (value: number) => {
    setTimeBetweenSteps(value);
  };

  useEffect(() => {
    clearInterval(intervalRef.current as NodeJS.Timeout);

    if (running) {
      intervalRef.current = setInterval(() => {
        setBoard((board) => ({
          generations: board.generations + 1,
          grid: computeNextGrid(board.grid),
        }));
      }, timeBetweenSteps);
    }
  }, [running, timeBetweenSteps]);

  return (
    <div>
      <Controls
        timeBetweenSteps={timeBetweenSteps}
        handleStartClick={() => {
          setRunning(true);
        }}
        handleNextClick={() => {
          setBoard((board) => ({
            generations: board.generations + 1,
            grid: computeNextGrid(board.grid),
          }));
        }}
        handlePauseClick={() => {
          setRunning(false);
        }}
        handleRandomizeClick={() => {
          setBoard((board) => ({
            ...board,
            grid: randomizeGrid(numRows, numCols),
          }));
        }}
        handleResetClick={() => {
          setBoard({
            generations: 0,
            grid: generateInitialGrid(numRows, numCols),
          });
        }}
        handleTimeBetweenStepsChange={handleTimeBetweenStepsChange}
      />
      <div className="mt-6 mb-2">
        <p className="font-bold text-lg text-center text-gray-800">
          Generations: {board.generations}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols},1.25rem)`,
        }}
      >
        {board.grid.map((rows, rowIndex) =>
          rows.map((col, colIndex) => (
            <Cell
              variant={board.grid[rowIndex][colIndex] ? 'active' : 'inactive'}
              handleClick={() => {
                const newGrid = produce(board.grid, (gridCopy) => {
                  gridCopy[rowIndex][colIndex] = !board.grid[rowIndex][colIndex];
                });
                setBoard((board) => ({
                  ...board,
                  grid: newGrid,
                }));
              }}
              key={`cell-${rowIndex}-${colIndex}`}
            />
          ))
        )}
      </div>
    </div>
  );
};
