import { configureStore } from '@reduxjs/toolkit';
import graphReducer from './slices/graphSlice.tsx';
import historyReducer from './slices/historySlice.tsx';

const store = configureStore({
  reducer: {
    graph: graphReducer,
    history: historyReducer,
  },
});

export default store;


