import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    currentRouteKey: '',
    prefix: "",
    role: ""
}

export const commonSlice = createSlice({
    name: 'base/common',
    initialState,
    reducers: {
        setCurrentRouteKey: (state, action) => {
            state.currentRouteKey = action.payload
        },
        setCurrentprefix: (state, action) => {
            console.log(action);

            state.prefix = action.payload
        },
        setCurrentRole: (state, action) => {
            console.log(action);

            state.role = action.payload
        }
    },
})

export const { setCurrentRouteKey, setCurrentprefix, setCurrentRole } = commonSlice.actions

export default commonSlice.reducer