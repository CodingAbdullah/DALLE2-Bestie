import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../service/authService';

// Using RTK to create slices of state to be held by one complex reducer, and others, simple reducers with actions that change state
// Asynchronous data calls are handled with function returns and thunk middleware
// Create a slice which contains all the information for the authReducer, including actions, async thunk and reducer state

// Set user to the value in localStorage if it exists to ensure user logged-in data persists
let user = localStorage.getItem('user');

export const login = createAsyncThunk('auth/login', 
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        }
        catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// Log out the user
export const logout = createAsyncThunk('auth/logout', async () => {
    return await authService.logout();
});

let authSlice = createSlice({
    name : 'auth',
    initialState : {
        user: user ? JSON.parse(user) : null,
        isLoading: false,
        isSuccess: false,
        error: false,
        token: null
    },
    reducers : {
        // Reset indicators to empty values
        reset : (state) => {
            state.isLoading = false;
            state.error = false;
            state.isSuccess = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(login.pending, (state) => {
            state.user = null;
            state.isLoading = true;
            state.isSuccess = false;
            state.error = false;
            state.token = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.error = false;
            state.isSuccess = true;
            state.token = action.payload.token;
        })
        .addCase(login.rejected, (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.error = action.error;
            state.token = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.error = false;
            state.token = null;
        })
    }
});

export const { reset }  = authSlice.actions;
export default authSlice.reducer;