import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../actions/authReducer';

// Updating store using configureStore and import reducer from 
const store = configureStore({
    reducer : {
        auth: authReducer
    }
});

export default store;