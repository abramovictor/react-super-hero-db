import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from 'redux-store/rootReducer';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});
