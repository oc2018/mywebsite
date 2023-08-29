import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: '', email: '', _id: '', createdAt: '' }; 

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: () => {
            initialState
            localStorage.clear();
        },
        setUser: (state, action) => {
            if(!state.user) {
                state.user = action.payload;
            }
        }
    }
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;