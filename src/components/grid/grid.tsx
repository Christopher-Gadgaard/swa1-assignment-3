import { Card, Typography } from "@mui/material";
import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Position,
  selectSecondTile,
  selectTile,
} from "../../actions/boardActions";
import { areInSameRowOrColumn } from "../../gameLogic/board";
import { RootState } from "../../reducers/rootReducer";
import { checkForMatch } from "../../gameLogic/boardLogic";

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
  const [matches, setMatches] = useState<any>([]);

  function getBoard() {
    const table = document.getElementById("tableBody");
    let tableContent: any[][] = [];
    tableContent = Array.from({ length: 8 }, () => Array(8).fill(0));

    if (table?.childNodes.length)
      for (let i = 0; i < table?.childNodes?.length; i++) {
        for (let j = 0; j < table?.childNodes[i].childNodes.length; j++) {
          tableContent[i][j] = table?.childNodes[i].childNodes[j].textContent;
        }
      }
    return tableContent;
  }
  const getTempBoard = (firstTile: Position, secondTile: Position) => {
    const table = document.getElementById("tableBody");
    let tableContent: any[][] = [];
    tableContent = Array.from({ length: 8 }, () => Array(8).fill(0));

    if (table?.childNodes.length)
      for (let i = 0; i < table?.childNodes?.length; i++) {
        for (let j = 0; j < table?.childNodes[i].childNodes.length; j++) {
          tableContent[i][j] = table?.childNodes[i].childNodes[j].textContent;
        }
      }
    if (
      firstTile.row !== undefined &&
      firstTile.col !== undefined &&
      secondTile.row !== undefined &&
      secondTile.col !== undefined
    ) {
      let firstTileValue = tableContent[firstTile.row][firstTile.col];
      let secondTileValue = tableContent[secondTile.row][secondTile.col];
      tableContent[firstTile.row][firstTile.col] = secondTileValue;

      tableContent[secondTile.row][secondTile.col] = firstTileValue;
    }
    return tableContent;
  };
  useEffect(() => {
    const generator = ["A", "B", "C", "D", "E", "F"];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        document.getElementById(`cell${i + 1}-${j + 1}`)!.innerHTML =
          generator[Math.floor(Math.random() * generator.length)];
      }
    }
  }, [size]);
  const resetSelectedTiles = useCallback(() => {
    if (
      selectedTile.selectedTile.position !== undefined &&
      tileToSwap.selectedTile.position !== undefined
    ) {
      dispatch(selectTile(undefined));
      dispatch(selectSecondTile(undefined));
    }
  }, [dispatch, selectedTile, tileToSwap]);

  const swap = useCallback(
    (selectedTile: any, selectedTileToSwap: any) => {
      const firstCell = document.getElementById(
        `cell${selectedTile.selectedTile.position.row + 1}-${
          selectedTile.selectedTile.position.col + 1
        }`
      );
      const firstCellValue = firstCell?.innerHTML;

      const secondCell = document.getElementById(
        `cell${selectedTileToSwap.selectedTile.position.row + 1}-${
          selectedTileToSwap.selectedTile.position.col + 1
        }`
      );
      const secondCellValue = secondCell?.innerHTML;
      if (secondCell) secondCell.innerHTML = `${firstCellValue}`;

      if (firstCell) firstCell.innerHTML = `${secondCellValue}`;
      resetSelectedTiles();
    },
    [resetSelectedTiles]
  );

  useEffect(() => {
    if (
      selectedTile.selectedTile.position &&
      tileToSwap.selectedTile.position
    ) {
      if (
        !areInSameRowOrColumn(
          selectedTile.selectedTile.position,
          tileToSwap.selectedTile.position
        )
      ) {
        setErrorMessage("Tiles are not in the same row or column");
        resetSelectedTiles();
      } else {
        setErrorMessage("");
        // const board = getBoard();
        // console.log(board);

        console.log(selectedTile.selectedTile.position);
        const value = document.getElementById(
          `cell${selectedTile.selectedTile.position.row + 1}-${
            selectedTile.selectedTile.position.col + 1
          }`
        )?.textContent;
        // console.log(value, "value");
        // console.log(tileToSwap.selectedTile.position, "position");

        let tempBoard = getTempBoard(
          tileToSwap.selectedTile.position,
          selectedTile.selectedTile.position
        );
        console.log(tempBoard, "tempBoard");
        setMatches(
          checkForMatch(tileToSwap.selectedTile.position, value, tempBoard)
        );

        swap(selectedTile, tileToSwap);
        // console.log(matches);
      }
    }
  }, [
    selectedTile,
    tileToSwap,
    swap,
    resetSelectedTiles,
    checkForMatch,
    getBoard,
    matches,
  ]);

  useEffect(() => {
    for (let i = 0; i < matches.length; i++) {
      const cell = document.getElementById(
        `cell${matches[i].row + 1}-${matches[i].col + 1}`
      );
      if (cell) {
        cell.style.background = "green";
      }
    }
  }, [matches]);
  return (
    <div>
      <table>
        <tbody id="tableBody">
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <Card
                    onClick={() => {
                      if (!selectedTile.selectedTile.position) {
                        dispatch(selectTile({ row: rowIndex, col: cellIndex }));
                      } else if (!tileToSwap.selectedTile.position) {
                        dispatch(
                          selectSecondTile({ row: rowIndex, col: cellIndex })
                        );
                      }
                    }}
                    sx={{
                      cursor: "pointer",
                      background: `${
                        selectedTile.selectedTile.position &&
                        selectedTile.selectedTile.position.row === rowIndex &&
                        selectedTile.selectedTile.position.col === cellIndex
                          ? "red"
                          : "white"
                      }`,
                    }}
                    id={`cell${rowIndex + 1}-${cellIndex + 1}`}
                    className="cell"
                  >
                    {children
                      ? children
                      : `Row ${rowIndex + 1}, Col ${cellIndex + 1}`}
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
