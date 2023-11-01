import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import "./styles.css";
interface ScoreboardProps {
  score: number;
}

const Scoreboard: FunctionComponent<ScoreboardProps> = (props) => {
  const { score } = props;
  return (
    <Box className="scoreboardContainer">
      <Typography>Score: {score}</Typography>
    </Box>
  );
};
export default Scoreboard;
