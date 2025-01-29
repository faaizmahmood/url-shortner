// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://url-shortner-server-f091f5331ce0.herokuapp.com/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('authToken')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            return await response.json(); // Assuming the API returns user data as JSON
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
    },
});

export default userSlice.reducer;
