import { Card } from "@mui/material";
import { FunctionComponent, ReactNode, useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTile } from "../../actions/boardActions";
import { RootState } from "../../reducers";

interface GameGridProps {
  size: number;
  children?: ReactNode;
}

const GameGrid: FunctionComponent<GameGridProps> = (props) => {
  const { size, children } = props;
  const selectedTile = useSelector((state: RootState) => state.selectedTile);
  const dispatch = useDispatch();

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
                      backgroundColor: `${
                        selectedTile &&
                        selectedTile.selectedTile.row === rowIndex &&
                        selectedTile.selectedTile.col === cellIndex
                          ? "red"
                          : "white"
                      }`,
                    }}
                    onClick={() => {
                      dispatch(selectTile(rowIndex, cellIndex));
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
    </div>
  );
};

export default GameGrid;
