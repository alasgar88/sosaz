import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import servicesSlice from './features/services/servicesSlice';
import packagesSlice from './features/packages/packagesSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    services: servicesSlice,
    packages: packagesSlice,
  },
});
