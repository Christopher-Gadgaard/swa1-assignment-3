// gameActions.ts
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
    UPDATE_GAME_FAILURE
} from './gameActionTypes';

export const getGamesRequest = () => ({
    type: GET_GAMES_REQUEST
});

export const getGamesSuccess = (gamesData: any) => ({
    type: GET_GAMES_SUCCESS,
    payload: gamesData
});

export const getGamesFailure = (error: string) => ({
    type: GET_GAMES_FAILURE,
    payload: error
});

export const postGameRequest = () => ({
    type: POST_GAME_REQUEST
});

export const postGameSuccess = (gameData: any) => ({
    type: POST_GAME_SUCCESS,
    payload: gameData
});

export const postGameFailure = (error: string) => ({
    type: POST_GAME_FAILURE,
    payload: error
});

export const getPlayerGamesRequest = () => ({
    type: GET_PLAYER_GAMES_REQUEST
});

export const getPlayerGamesSuccess = (playerGamesData: any) => ({
    type: GET_PLAYER_GAMES_SUCCESS,
    payload: playerGamesData
});

export const getPlayerGamesFailure = (error: string) => ({
    type: GET_PLAYER_GAMES_FAILURE,
    payload: error
});

export const updateGameRequest = () => ({
    type: UPDATE_GAME_REQUEST
});

export const updateGameSuccess = (updatedGameData: any) => ({
    type: UPDATE_GAME_SUCCESS,
    payload: updatedGameData
});

export const updateGameFailure = (error: string) => ({
    type: UPDATE_GAME_FAILURE,
    payload: error
});
