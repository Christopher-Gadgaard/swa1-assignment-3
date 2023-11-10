// gameLogicUtils.ts


const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

// Define a type for the tile types that corresponds to the keys in tileIcons
export type TileType = 'type-1' | 'type-2' | 'type-3' | 'type-4'| 'type-5' | 'type-6' | 'empty';

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
  const tileTypes: TileType[] = ['type-1', 'type-2', 'type-3', 'type-4', 'type-5', 'type-6']; // Update with actual tile types
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
    let y = 0;
    while (y < board[x].length - 2) {
      if (board[x][y].type !== 'empty' && board[x][y].type === board[x][y + 1].type && board[x][y].type === board[x][y + 2].type) {
        let matchStart = y;
        while (y < board[x].length && board[x][matchStart].type === board[x][y].type) {
          matches.push({ x, y });
          y++;
        }
      } else {
        y++;
      }
    }
  }

  return matches;
};


// Function to find all vertical matches on the board
const findVerticalMatches = (board: Tile[][]): Array<{ x: number, y: number }> => {
  let matches: Array<{ x: number, y: number }> = [];

  for (let y = 0; y < board[0].length; y++) {
    let x = 0;
    while (x < board.length - 2) {
      if (board[x][y].type !== 'empty' && board[x][y].type === board[x + 1][y].type && board[x][y].type === board[x + 2][y].type) {
        let matchStart = x;
        while (x < board.length && board[matchStart][y].type === board[x][y].type) {
          matches.push({ x, y });
          x++;
        }
      } else {
        x++;
      }
    }
  }

  return matches;
};

// Function to expand matches to adjacent tiles of the same type
const expandMatches = (board: Tile[][], matches: Array<{ x: number, y: number }>): Array<{ x: number, y: number }> => {
  let expandedMatches = new Set(matches.map(match => JSON.stringify(match))); // Use a set to avoid duplicates

  const checkAndAddMatch = (x: number, y: number, type: TileType) => {
    if (x >= 0 && x < BOARD_HEIGHT && y >= 0 && y < BOARD_WIDTH && board[x][y].type === type) {
      const matchString = JSON.stringify({ x, y });
      if (!expandedMatches.has(matchString)) {
        expandedMatches.add(matchString);
        expandFromTile(x, y, type);
      }
    }
  };

  const expandFromTile = (x: number, y: number, type: TileType) => {
    // Check and add all adjacent tiles of the same type
    checkAndAddMatch(x - 1, y, type); // Up
    checkAndAddMatch(x + 1, y, type); // Down
    checkAndAddMatch(x, y - 1, type); // Left
    checkAndAddMatch(x, y + 1, type); // Right
  };

  // Start expansion from the initial matches
  matches.forEach(match => {
    expandFromTile(match.x, match.y, board[match.x][match.y].type);
  });

  return Array.from(expandedMatches).map(match => JSON.parse(match));
};

// Function to find all matches on the board
export const findMatches = (board: Tile[][]): { matches: Array<{ x: number, y: number }>, score: number } => {
  let matches = [
    ...findHorizontalMatches(board),
    ...findVerticalMatches(board) // Combine horizontal and vertical matches
  ];

  matches = expandMatches(board, matches); // Expand matches to include all connected tiles of the same type

  // Remove duplicates from the matches array
  const uniqueMatches = Array.from(new Set(matches.map(match => JSON.stringify(match)))).map(str => JSON.parse(str));
 // Calculate score: for simplicity, 10 points per match
 const score = uniqueMatches.length * 10;

 return { matches: uniqueMatches, score };
};

// Function to process the board after matches have been found
export const dropDownTiles = (board: Tile[][], matches: Array<{ x: number, y: number }>): Tile[][] => {
  let newBoard = removeMatches(board, matches, 'empty');
  newBoard = collapseBoard(newBoard);
  newBoard = refillBoard(newBoard);
  return newBoard;
};

// Recursive function to process matches until no more are found
export const processMatches = (board: Tile[][]): { board: Tile[][], score: number } => {
  let matchResult = findMatches(board);
  let totalScore = 0;

  if (matchResult.matches.length > 0) {
    board = dropDownTiles(board, matchResult.matches);
    totalScore += matchResult.score;
    let nextResult = processMatches(board);
    board = nextResult.board;
    totalScore += nextResult.score;
  }

  return { board, score: totalScore };
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
  let matchResult = findMatches(simulatedBoard);
  return matchResult.matches.length > 0;
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
