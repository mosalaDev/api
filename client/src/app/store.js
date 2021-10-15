import { configureStore } from '@reduxjs/toolkit';
import { reducer as adminReducers } from '../reducers/admin';

export const store = configureStore({
  reducer: {
    admin: adminReducers
  },
});
