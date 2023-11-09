// gameLogicUtils.ts

import { Tile } from '../reducers/gameLogicReducer'; 

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

// Function to find all matches on the board
export const findMatches = (board: Tile[][]): Array<{ x: number, y: number }> => {
  // Placeholder implementation - you will need to implement the logic for finding matches
  // This should return an array of coordinates for each tile that is part of a match
  let matches: Array<{ x: number, y: number }> = [];
  
  // TODO: Add logic to find matches

  return matches;
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
