import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from './slices/courseSlice';
import userReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
  },
})