// gameReducer.ts
import {
    GET_GAMES_REQUEST,
    GET_GAMES_SUCCESS,
    GET_GAMES_FAILURE,
    POST_GAME_REQUEST,
    POST_GAME_SUCCESS,
    POST_GAME_FAILURE,
    GET_PLAYER_GAMES_REQUEST,
    GET_PLAYER_GAMES_SUCCESS,
    GET_PLAYER_GAMES_FAILURE,
    UPDATE_GAME_REQUEST,
    UPDATE_GAME_SUCCESS,
    UPDATE_GAME_FAILURE,
  } from "../actions/gameActionTypes";
  
  // Define the shape of the game's state
  interface GameState {
    loading: boolean;
    games: any[]; // Replace 'any' with your game type
    playerGames: any[]; // Replace 'any' with your player game type
    error: string | null;
  }
  
  // Initial state for the game reducer
  const initialState: GameState = {
    loading: false,
    games: [],
    playerGames: [],
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
  
      case GET_PLAYER_GAMES_REQUEST:
        return { ...state, loading: true, error: null };
  
      case GET_PLAYER_GAMES_SUCCESS:
        return { ...state, loading: false, playerGames: action.payload, error: null };
  
      case GET_PLAYER_GAMES_FAILURE:
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
  