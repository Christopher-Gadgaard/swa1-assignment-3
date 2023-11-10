// gameLogicUtils.ts


const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

// Define a type for the tile types that corresponds to the keys in tileIcons
export type TileType = 'type-1' | 'type-2' | 'type-3' | 'type-4'| 'empty';

// Define the shape of a single tile
export interface Tile {
  type: TileType;
  // ... other properties
}


// Utility function to check for potential matches
const checkForPotentialMatch = (board: Tile[][], currentRow: Tile[], x: number, y: number, newTileType: TileType): boolean => {
  // Check for horizontal potential match within the current row being constructed
  if (y >= 2 && currentRow[y - 1].type === newTileType && currentRow[y - 2].type === newTileType) {
    return true;
  }

  // Check for vertical potential match within the board
  if (x >= 2 && board[x - 1][y].type === newTileType && board[x - 2][y].type === newTileType) {
    return true;
  }

  return false;
};

// Function to create an initial board without any matches
export const createInitialBoard = (): Tile[][] => {
  let board: Tile[][] = [];
  for (let x = 0; x < BOARD_HEIGHT; x++) {
    let currentRow: Tile[] = [];
    for (let y = 0; y < BOARD_WIDTH; y++) {
      let newTile: Tile;
      do {
        newTile = createRandomTile();
      } while (checkForPotentialMatch(board, currentRow, x, y, newTile.type));
      currentRow.push(newTile);
    }
    board.push(currentRow);
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

// Function to process the board after matches have been found
export const dropDownTiles = (board: Tile[][], matches: Array<{ x: number, y: number }>): Tile[][] => {
  let newBoard = board.map(row => [...row]);
  const emptyType: TileType = 'empty'; // Define your empty tile type here
  
  newBoard = removeMatches(newBoard, matches, emptyType);
  newBoard = collapseBoard(newBoard);
  newBoard = refillBoard(newBoard);
  
  return newBoard;
};


// Utility function to simulate swapping two tiles
const simulateSwap = (board: Tile[][], firstTile: { x: number, y: number }, secondTile: { x: number, y: number }): Tile[][] => {
  let newBoard = board.map(row => [...row]);
  [newBoard[firstTile.x][firstTile.y], newBoard[secondTile.x][secondTile.y]] = [newBoard[secondTile.x][secondTile.y], newBoard[firstTile.x][firstTile.y]];
  return newBoard;
};

// Utility function to check if a move (swap) is legal
export const isLegalMove = (board: Tile[][], firstTile: { x: number, y: number }, secondTile: { x: number, y: number }): boolean => {
  // Check if the tiles are adjacent
  if (!((firstTile.x === secondTile.x && Math.abs(firstTile.y - secondTile.y) === 1) ||
        (firstTile.y === secondTile.y && Math.abs(firstTile.x - secondTile.x) === 1))) {
    return false;
  }

  // Simulate the swap
  let simulatedBoard = simulateSwap(board, firstTile, secondTile);

  // Check for a match after the swap
  let matches = findMatches(simulatedBoard);
  return matches.length > 0;
};

// Marks the matched tiles as empty
const removeMatches = (board: Tile[][], matches: Array<{ x: number, y: number }>, emptyType: TileType): Tile[][] => {
  matches.forEach(match => {
    board[match.x][match.y].type = emptyType; // Mark as empty
  });
  return board;
};

// Shifts non-empty tiles down to fill any empty spaces
const collapseBoard = (board: Tile[][]): Tile[][] => {
  for (let y = 0; y < BOARD_WIDTH; y++) {
    for (let x = BOARD_HEIGHT - 1; x >= 0; x--) {
      if (board[x][y].type === 'empty') {
        for (let aboveX = x - 1; aboveX >= 0; aboveX--) {
          if (board[aboveX][y].type !== 'empty') {
            board[x][y] = board[aboveX][y]; // Tile falls down
            board[aboveX][y] = { type: 'empty' }; // Set the moved tile's previous position to empty
            break;
          }
        }
      }
    }
  }
  return board;
};

// Fills the top of the board with new random tiles
const refillBoard = (board: Tile[][]): Tile[][] => {
  for (let y = 0; y < BOARD_WIDTH; y++) {
    for (let x = 0; x < BOARD_HEIGHT; x++) {
      if (board[x][y].type === 'empty') {
        board[x][y] = createRandomTile(); // Create a new tile
      }
    }
  }
  return board;
};
