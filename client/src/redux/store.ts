import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './user.reducer';

const store = configureStore({
  reducer: {
    UserReducer,
  },
});
export default store;