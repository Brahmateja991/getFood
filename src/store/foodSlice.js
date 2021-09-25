import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const foodItemsfromDb = createAsyncThunk('foodItemsfromDb', async (userDetails, thunkAPI) => {

    //make post
    let data;
    console.log('food Slice')
    let response = await axios.post('/users/getfooditems')
    if (response.data.message === "success") {
        console.log('response',response)
        return response.data.payload
    }

})

let foodSlice = createSlice({
    name:"foodItems",
    initialState: {foodItems:[],
        isSuccessFood : false,
        isLoadingFood : false,
        isErrorFood : false,
        invalidLoginFood : ''
    },
    reducers:{
        //setRestaurantsOfStore : (state,action) =>{state.foodItems = action.payload}
    },
    extraReducers: {
        [foodItemsfromDb.fulfilled]: (state, action) => {
            state.foodItems = action.payload;
            state.isSuccessFood = true;
            state.isLoadingFood = false;
            state.isErrorFood = false;
        },
        [foodItemsfromDb.pending]: (state, action) => {
            state.isLoadingFood = true;
        },
        [foodItemsfromDb.rejected]: (state, action) => {
            state.isErrorFood = true;
            state.isLoadingFood = false;
            state.invalidLoginFood = action.payload.message;
        }
    }
})
//export let {setRestaurantsOfStore} = restaurantDetSlice.actions 
export default foodSlice.reducer
