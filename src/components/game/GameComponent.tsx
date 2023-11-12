// GameComponent.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTile, swapTiles } from "../../slices/gameSlice"; // Update to use actions from the slice
import { AppDispatch, RootState } from "../../store"; // Update the import path according to your file structure
import "./GameComponent.css"; // Make sure to import your CSS

// Import SVG icons
import IconType1 from "../../images/atronaut-svgrepo-com.svg";
import IconType2 from "../../images/brain-slug-svgrepo-com.svg";
import IconType3 from "../../images/galaxy-svgrepo-com.svg";
import IconType4 from "../../images/laser-gun-svgrepo-com.svg";
import IconType5 from "../../images/millennium-falcon-svgrepo-com.svg";
import IconType6 from "../../images/saturn-svgrepo-com.svg";
import { updateGame } from "../../thunks/gameServerThunks";

// A simple mapping from tile types to their corresponding SVGs
const tileIcons = {
  "type-1": IconType1,
  "type-2": IconType2,
  "type-3": IconType3,
  "type-4": IconType4,
  "type-5": IconType5,
  "type-6": IconType6,
};

interface GameComponentProps {
  onGameStart: () => void;
}

const GameComponent: React.FC<GameComponentProps> = ({ onGameStart }) => {
  const dispatch: AppDispatch = useDispatch();
  const { board, selectedTile, score, id } = useSelector(
    (state: RootState) => state.gameLogic
  );

  const { userId, token } = useSelector(
    (state: RootState) => state.user
  );
 
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


  useEffect(() => {
    // Define the updateData object
    const updateData = { score }; // Assuming you want to update the score
    console.log("updateData", updateData, " id ", id, " token ", token);
    if (id !== -1 && token) { // Check if the game ID is valid and token is not null
      dispatch(updateGame(id, token, updateData));
    }
  }, [score, dispatch, id, token]);

  return (
    <div>
      <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((tile, columnIndex) => (
            <div
              key={columnIndex}
              className={`tile ${
                selectedTile &&
                selectedTile.x === rowIndex &&
                selectedTile.y === columnIndex
                  ? "selected"
                  : ""
              } ${tile.type === "empty" ? "empty" : ""}`}
              onClick={() => handleTileClick(rowIndex, columnIndex)}
            >
              {tile.type !== "empty" && (
                <img src={tileIcons[tile.type]} alt={tile.type} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className="score-display">Score: {score}</div>
    </div>
    
  );
};

export default GameComponent;
