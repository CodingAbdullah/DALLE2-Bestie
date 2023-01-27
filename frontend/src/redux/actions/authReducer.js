import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../service/authService';

// Using RTK to create slices of state to be held by one complex reducer, and others, simple reducers with actions that change state
// Asynchronous data calls are handled with function returns and thunk middleware

const auth = createAsyncThunk('auth/login', 
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        }
        catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// Create a slice which contains all the information for the authReducer, including actions, async thunk and reducer state
let authSlice = createSlice({
    name : 'auth',
    initialState : {
        user: null,
        isLoading: false,
        error: false,
        token: ''
    },
    reducers : {
        logout : (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = false;
            state.token = '';
        }
    },
    extraReducers : (builder) => {
        builder.addCase(auth.pending, (state) => {
            state.user = null;
            state.isLoading = true;
            state.error = false;
            state.token = '';
        })
        .addCase(auth.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.error = false;
            state.token = action.payload.token;
        })
        .addCase(auth.rejected, (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.error = action.error;
            state.token = '';
        })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;