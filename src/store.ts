import { createStore, applyMiddleware, Action } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState } from './reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export default store;
