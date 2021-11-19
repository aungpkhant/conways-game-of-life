import produce from 'immer';

export const DIRECTIONS = [
  { xOffset: -1, yOffset: -1 },
  { xOffset: 0, yOffset: -1 },
  { xOffset: 1, yOffset: -1 },
  { xOffset: -1, yOffset: 0 },
  { xOffset: 1, yOffset: 0 },
  { xOffset: -1, yOffset: 1 },
  { xOffset: 0, yOffset: 1 },
  { xOffset: 1, yOffset: 1 },
];

export const computeNextGrid = (grid: boolean[][]): boolean[][] => {
  return produce(grid, (gridCopy) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let aliveNeighborsCount = 0;
        const currentCellAlive = grid[i][j];

        // count neighbours
        DIRECTIONS.forEach(({ xOffset, yOffset }) => {
          const neighbourXCoordinates = i + xOffset;
          const neighbourYCoordinates = j + yOffset;

          // check out of x bounds
          if (neighbourXCoordinates < 0 || neighbourXCoordinates >= grid.length) {
            return;
          }
          // check out of y bounds
          if (neighbourYCoordinates < 0 || neighbourYCoordinates >= grid[i].length) {
            return;
          }

          if (grid[neighbourXCoordinates][neighbourYCoordinates]) {
            aliveNeighborsCount += 1;
          }
        });

        // game of life rules

        let cellAliveNextStep;
        if (currentCellAlive) {
          cellAliveNextStep = aliveNeighborsCount === 2 || aliveNeighborsCount === 3;
        } else {
          cellAliveNextStep = aliveNeighborsCount === 3;
        }
        gridCopy[i][j] = cellAliveNextStep;
      }
    }
  });
};

export const generateInitialGrid = (numRows: number, numCols: number) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => false));
  }
  return rows;
};

export const randomizeGrid = (numRows: number, numCols: number) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => Math.random() >= 0.5));
  }
  return rows;
};
