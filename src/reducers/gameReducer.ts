// gameReducer.ts
import {
  GET_GAMES_REQUEST,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  POST_GAME_REQUEST,
  POST_GAME_SUCCESS,
  POST_GAME_FAILURE,
  GET_GAME_BY_ID_REQUEST,
  GET_GAME_BY_ID_SUCCESS,
  GET_GAME_BY_ID_FAILURE,
  UPDATE_GAME_REQUEST,
  UPDATE_GAME_SUCCESS,
  UPDATE_GAME_FAILURE,
} from "../actions/gameActionTypes";

// Define the shape of the game's state
interface Game {
  id: number;
  user: number;
  score: number;
  completed: boolean;
}

interface GameState {
  loading: boolean;
  games: Game[]; // Use the Game type here
  gameDetails: Game | null; // Store the single game details here
  error: string | null;
}

// Initial state for the game reducer
const initialState: GameState = {
  loading: false,
  games: [],
  gameDetails: null,
  error: null,
};

// The game reducer function
const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_GAMES_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_GAMES_SUCCESS:
      return { ...state, loading: false, games: action.payload, error: null };

    case GET_GAMES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case POST_GAME_REQUEST:
      return { ...state, loading: true, error: null };

    case POST_GAME_SUCCESS:
      return { ...state, loading: false, games: [...state.games, action.payload], error: null };

    case POST_GAME_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_GAME_BY_ID_REQUEST:
      return { ...state, loading: true, gameDetails: null, error: null };

    case GET_GAME_BY_ID_SUCCESS:
      return { ...state, loading: false, gameDetails: action.payload, error: null };

    case GET_GAME_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_GAME_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_GAME_SUCCESS:
      // Update the game within the games array
      const updatedGames = state.games.map(game =>
        game.id === action.payload.id ? action.payload : game
      );
      return { ...state, loading: false, games: updatedGames, error: null };

    case UPDATE_GAME_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default gameReducer;
