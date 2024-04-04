import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import studentSlice from './slices/studentSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        student: studentSlice
    },
});
