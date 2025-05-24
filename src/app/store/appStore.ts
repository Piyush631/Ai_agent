import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './slice/questionSlice';
export const store=configureStore({
    reducer:{
        question:questionReducer
    }
})
