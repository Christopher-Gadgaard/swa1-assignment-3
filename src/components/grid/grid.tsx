import { Card, Typography } from "@mui/material";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSecondTile, selectTile } from "../../actions/boardActions";
import { RootState } from "../../reducers";
import { areInSameRowOrColumn } from "../../gameLogic/board";

interface GameGridProps {
  size: number;
  children?: ReactNode;
}

const GameGrid: FunctionComponent<GameGridProps> = (props) => {
  const { size, children } = props;
  const selectedTile = useSelector((state: RootState) => state.selectedTile);
  const tileToSwap = useSelector((state: RootState) => state.tileToSwap);
  const dispatch = useDispatch();
  const [erorMessage, setErrorMessage] = useState("");
  const tableData = Array.from({ length: size }, () => Array(size).fill(null));

  useEffect(() => {
    const generator = ["A", "B", "C", "D"];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        document.getElementById(`cell${i + 1}-${j + 1}`)!.innerHTML =
          generator[Math.floor(Math.random() * generator.length)];
      }
    }
  }, [size]);
  useEffect(() => {
    if (selectedTile.selectedTile && tileToSwap.selectedTileToSwap) {
      if (
        !areInSameRowOrColumn(
          selectedTile.selectedTile,
          tileToSwap.selectedTileToSwap
        )
      ) {
        setErrorMessage("Tiles are not in the same row or column");
      } else {
        setErrorMessage("");
        swap(selectedTile.selectedTile, tileToSwap.selectedTileToSwap);
      }
    }
  }, [selectedTile, tileToSwap]);

  function swap(selectedTile: any, selectedTileToSwap: any) {
    const firstCell = document.getElementById(
      `cell${selectedTile.row + 1}-${selectedTile.col + 1}`
    );
    const firstCellValue = firstCell?.innerHTML;

    const secondCell = document.getElementById(
      `cell${selectedTileToSwap.row + 1}-${selectedTileToSwap.col + 1}`
    );
    const secondCellValue = secondCell?.innerHTML;
    if (secondCell) secondCell.innerHTML = `${firstCellValue}`;

    if (firstCell) firstCell.innerHTML = `${secondCellValue}`;
  }
  return (
    <div>
      <table>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  {/* You can customize the content of each cell here */}
                  <Card
                    sx={{
                      cursor: "pointer",
                      background: `${
                        selectedTile.selectedTile &&
                        selectedTile.selectedTile.row === rowIndex &&
                        selectedTile.selectedTile.col === cellIndex
                          ? "red"
                          : "white"
                      }`,
                    }}
                    onClick={() => {
                      if (!selectedTile.selectedTile) {
                        dispatch(selectTile(rowIndex, cellIndex));
                      } else {
                        dispatch(selectSecondTile(rowIndex, cellIndex));
                      }
                    }}
                    id={`cell${rowIndex + 1}-${cellIndex + 1}`}
                    className="cell"
                  >
                    {children
                      ? // If children prop is provided, use it as the content
                        children
                      : // Otherwise, default content
                        `Row ${rowIndex + 1}, Col ${cellIndex + 1}`}
                  </Card>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Typography>{erorMessage}</Typography>
    </div>
  );
};

export default GameGrid;
