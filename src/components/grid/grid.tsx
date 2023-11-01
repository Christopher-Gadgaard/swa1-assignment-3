import { Card } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import "./styles.css";

interface GameGridProps {
  size: number;
  children?: ReactNode;
}
const GameGrid: FunctionComponent<GameGridProps> = (props) => {
  const { size, children } = props;
  const tableData = Array.from({ length: size }, () => Array(size).fill(null));

  return (
    <div>
      <table>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  {/* You can customize the content of each cell here */}
                  <Card className="cell">
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
