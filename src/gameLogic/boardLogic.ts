import { Position } from "./board";

export function checkForMatch(position: Position, board: any[][]): Position[] {
    const tile = board[position.row][position.col];
    const matchedPositions: Position[] = [];

    if (!tile) return matchedPositions;

    // Horizontal check
    let left = position.col;
    while (left >= 0 && board[position.row][left] === tile) {
      left--;
    }

    let right = position.col;
    while (right < board[0].length && board[position.row][right] === tile) {
      right++;
    }

    if (right - left - 1 >= 3) {
      for (let i = left + 1; i < right; i++) {
        matchedPositions.push({ row: position.row, col: i });
      }
    }

    // Vertical check
    let up = position.row;
    while (up >= 0 && board[up][position.col] === tile) {
      up--;
    }

    let down = position.row;
    while (down < board.length && board[down][position.col] === tile) {
      down++;
    }

    if (down - up - 1 >= 3) {
      for (let i = up + 1; i < down; i++) {
        matchedPositions.push({ row: i, col: position.col });
      }
    }

    return matchedPositions;
}