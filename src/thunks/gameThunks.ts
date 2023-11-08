// gameThunks.ts
import { Dispatch } from 'redux';
import {
  getGamesRequest,
  getGamesSuccess,
  getGamesFailure,
  getGameByIdRequest,
  getGameByIdSuccess,
  getGameByIdFailure,
  postGameRequest,
  postGameSuccess,
  postGameFailure,
  updateGameRequest,
  updateGameSuccess,
  updateGameFailure
} from '../actions/gameActions';

interface Game {
  id: number;
  user: number;
  score: number;
  completed: boolean;
  // ... any other properties that a game might have
}

const serverUrl = 'http://localhost:9090';

export const fetchGames = (token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(getGamesRequest());

    try {
      const response = await fetch(`${serverUrl}/games?token=${token}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }

      const data = await response.json();
      console.log(data);
      dispatch(getGamesSuccess(data));
    } catch (error) {
      dispatch(getGamesFailure("Network error. Please try again."));
    }
  };
};

export const startNewGame = (token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(postGameRequest());

    try {
      const response = await fetch(`${serverUrl}/games?token=${token}`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to start new game');
      }

      const data = await response.json();
      dispatch(postGameSuccess(data));
    } catch (error) {
      dispatch(postGameFailure("Network error. Please try again."));
    }
  };
};

export const fetchGameById = (token: string, gameId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(getGameByIdRequest());

    try {
      const response = await fetch(`${serverUrl}/games/${gameId}?token=${token}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch game by ID');
      }

      const game = await response.json();
      console.log('Game Details:', game);
      dispatch(getGameByIdSuccess(game));
    } catch (error) {
      dispatch(getGameByIdFailure("Network error. Please try again."));
    }
  };
};


export const updateGame = (gameId: number, token: string, updateData: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateGameRequest());

    try {
      const response = await fetch(`${serverUrl}/games/${gameId}?token=${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to update game');
      }

      const data = await response.json();
      dispatch(updateGameSuccess(data));
    } catch (error) {
      dispatch(updateGameFailure("Network error. Please try again."));
    }
  };
};

