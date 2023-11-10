// GameComponent.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTile, swapTiles } from '../../slices/gameSlice'; // Update to use actions from the slice
import { RootState } from '../../store'; // Update the import path according to your file structure
import './GameComponent.css'; // Make sure to import your CSS

// Import SVG icons
import IconType1 from '../../images/atronaut-svgrepo-com.svg';
import IconType2 from '../../images/brain-slug-svgrepo-com.svg';
import IconType3 from '../../images/galaxy-svgrepo-com.svg';
import IconType4 from '../../images/laser-gun-svgrepo-com.svg';
import { findMatches } from '../../gameLogic/gameLogicUtils';
// ... import other icons as needed

// A simple mapping from tile types to their corresponding SVGs
const tileIcons = {
  'type-1': IconType1,
  'type-2': IconType2,
  'type-3': IconType3,
  'type-4': IconType4,
  // ... other mappings
};



const GameComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { board, selectedTile } = useSelector((state: RootState) => state.gameLogic); // Update to select from 'game' slice
  const matches = findMatches(board);
  console.log('Found matches:', matches);
 // Handle tile selection
 const handleTileClick = (x: number, y: number) => {
  if (selectedTile && selectedTile.x === x && selectedTile.y === y) {
    // Deselect the currently selected tile if it is clicked again
    dispatch(selectTile(null));
  } else if (selectedTile) {
    // Attempt to swap if another tile is selected
    dispatch(swapTiles({ firstTile: selectedTile, secondTile: { x, y } }));
  } else {
    // Select the tile if no tile is currently selected
    dispatch(selectTile({ x, y }));
  }
};

   return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((tile, columnIndex) => (
            <div
              key={columnIndex}
              className={`tile ${selectedTile && selectedTile.x === rowIndex && selectedTile.y === columnIndex ? 'selected' : ''} ${tile.type === 'empty' ? 'empty' : ''}`}
              onClick={() => handleTileClick(rowIndex, columnIndex)}
            >
              {tile.type !== 'empty' && (
                <img src={tileIcons[tile.type]} alt={tile.type} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameComponent;
