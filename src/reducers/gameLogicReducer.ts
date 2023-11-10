// gameLogicReducer.ts
import { SELECT_TILE, SWAP_TILES, REMOVE_MATCHES, DROP_TILES } from '../actions/gameLogicActionTypes';
import { performSwap, findMatches, dropDownTiles, isLegalMove } from '../gameLogic/gameLogicUtils';


// Define the width and height of the board
const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

// Define a type for the tile types that corresponds to the keys in tileIcons
export type TileType = 'type-1' | 'type-2' | 'type-3'| 'type-4';

// Define the shape of a single tile
export interface Tile {
  type: TileType; // Use the TileType type here
  // ... other properties
}

// Define the shape of the game state
interface GameState {
  board: Tile[][]; // A 2D array representing the game board
  selectedTile: { x: number, y: number } | null; // Coordinates of the first selected tile
  tileToSwap: { x: number, y: number } | null; // Coordinates of the second selected tile
  matches: Array<{ x: number, y: number }>; // An array of coordinates where matches are found
  isSwapping: boolean; // Whether a swap animation is in progress
  isMatching: boolean; // Whether a match-checking process is in progress
}

// Define the initial state of the game with a populated board
const initialState: GameState = {
  board: createInitialBoard(), // Call a function to populate the board with tiles
  selectedTile: null,
  tileToSwap: null,
  matches: [],
  isSwapping: false,
  isMatching: false,
};

// Utility function to create an initial board
function createInitialBoard(): Tile[][] {
  let board: Tile[][] = [];
  for (let x = 0; x < BOARD_HEIGHT; x++) {
    let row: Tile[] = [];
    for (let y = 0; y < BOARD_WIDTH; y++) {
      row.push(createRandomTile());
    }
    board.push(row);
  }
  return board;
}

// Utility function to create a random tile
function createRandomTile(): Tile {
  const tileTypes: TileType[] = ['type-1', 'type-2', 'type-3', 'type-4']; // Use TileType array for type safety
  const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
  return { type: randomType };
}

// The game logic reducer
const gameLogicReducer = (state: GameState = initialState, action: any): GameState => {
  switch (action.type) {
    case SWAP_TILES: {
      const { firstTile, secondTile } = action.payload;
      
      // Check if the move is legal before swapping
      if (isLegalMove(state.board, firstTile, secondTile)) {
        let newBoard = performSwap(state.board, firstTile, secondTile);

        // Find matches after the swap
        let matches = findMatches(newBoard);

        // If there are matches, proceed with removing them and dropping tiles
        if (matches.length > 0) {
          newBoard = dropDownTiles(newBoard, matches); // This function should also handle removing matches internally
          // TODO: Refill the board with new tiles where necessary
        }

        // Return the new state
        return {
          ...state,
          board: newBoard,
          selectedTile: null, // Deselect any previously selected tiles
          matches: matches, // Update the matches in the state
          // Other state updates if necessary
        };
      }

      // If the move is not legal, return the state without changes
      return state;
    }
    // ... other action cases ...

    default:
      return state;
  }
};

export default gameLogicReducer;
