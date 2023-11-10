// store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // Redux Toolkit's `configureStore` already uses Redux Thunk middleware by default
  // You can add additional middleware like this:
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(yourMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
