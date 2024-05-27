import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        userData: [],
        generateddata: null,
        path_name: "",
        credit_count: 0,
        plan_details: []
    },
    reducers: {
        user: (state, action) => {
            state.userData = action.payload
        },
        generatedData: (state, action) => {
            state.generateddata = action.payload
        },
        location: (state, action) => {
            state.path_name = action.payload
        },
        credit_count: (state, action) => {
            state.credit_count = action.payload
        },
        plan_details: (state, action) => {
            state.plan_details = action.payload
        }
    }
})
export const { user, generatedData, location, credit_count, plan_details } = homeSlice.actions
export default homeSlice.reducer