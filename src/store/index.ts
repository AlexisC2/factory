import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import projectReducer from './slices/projectSlice';
import templateReducer from './slices/templateSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    template: templateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;