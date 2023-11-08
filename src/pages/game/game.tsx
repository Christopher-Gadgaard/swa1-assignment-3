import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import GameGrid from "../../components/grid/grid";
import Scoreboard from "../../components/scoreboard/scoreboard";
import Topbar from "../../components/topbar/topbar";
import "./styles.css";

// Import the updated thunk action creators
import {
  fetchGames,
  startNewGame,
  fetchGameById, // Make sure this is correctly imported from your thunks
  updateGame,
} from '../../thunks/gameThunks';
import { AppDispatch } from '../../store';

const Game: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);

  // Handlers for button clicks
  const handleFetchGames = () => {
    dispatch(fetchGames(token));
  };

  const handleStartNewGame = () => {
    dispatch(startNewGame(token));
  };

  // Fetch game with ID 1
  const handleFetchGameById = () => {
    const gameId = 1; // Hardcoded for now
    dispatch(fetchGameById(token, gameId));
  };

  const handleUpdateGame = () => {
    const gameId = 1; // Hardcoded for now
    const mockUpdateData = { score: 1300 };
    dispatch(updateGame(gameId, token, mockUpdateData));
  };

  // Fetch all games once on component mount
  useEffect(() => {
    handleFetchGames();
  }, [dispatch]);

  return (
    <div>
      <Topbar />
      <Scoreboard score={1000} />
      <div className="gameContainer">
        <GameGrid size={8} />
        <button onClick={handleFetchGames}>Fetch All Games</button>
        <button onClick={handleStartNewGame}>Start New Game</button>
        <button onClick={handleFetchGameById}>Fetch Game ID 1</button>
        <button onClick={handleUpdateGame}>Update Game ID 1</button>
      </div>
    </div>
  );
};

export default Game;
