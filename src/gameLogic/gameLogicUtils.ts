// gameLogicUtils.ts


const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

// Define a type for the tile types that corresponds to the keys in tileIcons
export type TileType = 'type-1' | 'type-2' | 'type-3' | 'type-4';

// Define the shape of a single tile
export interface Tile {
  type: TileType;
  // ... other properties
}


// Function to create an initial board without any matches
export const createInitialBoard = (): Tile[][] => {
  let board: Tile[][] = [];
  for (let x = 0; x < BOARD_HEIGHT; x++) {
    let row: Tile[] = [];
    for (let y = 0; y < BOARD_WIDTH; y++) {
      // You can replace this with the actual logic to ensure no initial matches
      row.push(createRandomTile());
    }
    board.push(row);
  }
  return board;
};

// Utility function to create a random tile
export const createRandomTile = (): Tile => {
  const tileTypes: TileType[] = ['type-1', 'type-2', 'type-3', 'type-4']; // Update with actual tile types
  const randomIndex = Math.floor(Math.random() * tileTypes.length);
  return { type: tileTypes[randomIndex] };
};

// Function to swap two tiles on the board
export const performSwap = (board: Tile[][], firstTile: { x: number, y: number }, secondTile: { x: number, y: number }): Tile[][] => {
  // Clone the board to avoid mutating the original state
  let newBoard = board.map(row => [...row]);

  // Swap the tiles
  let temp = newBoard[firstTile.x][firstTile.y];
  newBoard[firstTile.x][firstTile.y] = newBoard[secondTile.x][secondTile.y];
  newBoard[secondTile.x][secondTile.y] = temp;

  return newBoard;
};

// Function to find all horizontal matches on the board
const findHorizontalMatches = (board: Tile[][]): Array<{ x: number, y: number }> => {
  let matches: Array<{ x: number, y: number }> = [];

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length - 2; y++) {
      if (board[x][y].type === board[x][y + 1].type && board[x][y].type === board[x][y + 2].type) {
        matches.push({ x, y });
        matches.push({ x, y: y + 1 });
        matches.push({ x, y: y + 2 });
        
        // Skip the next two tiles in the row since we've already found a match
        y += 2;
      }
    }
  }

  return matches;
};

// Function to find all vertical matches on the board
const findVerticalMatches = (board: Tile[][]): Array<{ x: number, y: number }> => {
  let matches: Array<{ x: number, y: number }> = [];

  for (let y = 0; y < board[0].length; y++) {
    for (let x = 0; x < board.length - 2; x++) {
      if (board[x][y].type === board[x + 1][y].type && board[x][y].type === board[x + 2][y].type) {
        matches.push({ x, y });
        matches.push({ x: x + 1, y });
        matches.push({ x: x + 2, y });

        // Skip the next two tiles in the column since we've already found a match
        x += 2;
      }
    }
  }

  return matches;
};

// Function to find all matches on the board
export const findMatches = (board: Tile[][]): Array<{ x: number, y: number }> => {
  let matches = [
    ...findHorizontalMatches(board),
    ...findVerticalMatches(board) // Combine horizontal and vertical matches
  ];

  // Remove duplicates from the matches array, as a tile could be part of both a horizontal and a vertical match
  const uniqueMatches = Array.from(new Set(matches.map(match => JSON.stringify(match)))).map(str => JSON.parse(str));
  return uniqueMatches;
};

// Function to drop down tiles after matches have been removed
export const dropDownTiles = (board: Tile[][], matches: Array<{ x: number, y: number }>): Tile[][] => {
  // Placeholder implementation - you will need to implement the logic for dropping down tiles
  // This should return a new board with the tiles dropped down
  let newBoard = board.map(row => [...row]);

  // TODO: Add logic to drop tiles

  return newBoard;
};

// Utility function to check if a move (swap) is legal
export const isLegalMove = (board: Tile[][], firstTile: { x: number, y: number }, secondTile: { x: number, y: number }): boolean => {
  // Implement the logic to check if swapping the two tiles is a legal move
  // For simplicity, this function just checks if the tiles are adjacent
  return (
    (firstTile.x === secondTile.x && Math.abs(firstTile.y - secondTile.y) === 1) ||
    (firstTile.y === secondTile.y && Math.abs(firstTile.x - secondTile.x) === 1)
  );
};

// You can add more utility functions as needed for different aspects of the game logic
