import { createSlice } from '@reduxjs/toolkit'
const token = sessionStorage.getItem("client-token")

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        token: token,
        signedIn: false,
        permission: []
    },
    reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.token = action.payload
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setPermissions: (state, action) => {
            console.log(action.payload);

            state.permission = action.payload
        }
    },
})

export const { onSignInSuccess, onSignOutSuccess, setToken, setPermissions } = sessionSlice.actions

export default sessionSlice.reducer