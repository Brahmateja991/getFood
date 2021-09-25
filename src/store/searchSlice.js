import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: "search",
    initialState: {searchFood: [] },
    reducers: {
        searchFoodItemsofStore : (state,action) =>{state.searchFood = action.payload}
    }
})

export const { searchFoodItemsofStore } = searchSlice.actions
export default searchSlice.reducer