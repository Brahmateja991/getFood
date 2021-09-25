import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const restaurant = createAsyncThunk('restaurant', async (userDetails, thunkAPI) => {

    //make post
    let data;
    console.log('restauat Slice')
    let response = await axios.post('/users/getrestaurants')
    if (response.data.message === "success") {
        console.log('response',response)
        return response.data.payload
    }

})

let restaurantDetSlice = createSlice({
    name:"restaurants",
    initialState: {restaurants:[],
        isSuccessRest: false,
        isLoadingRest: false,
        isErrorRest: false,
        invalidLoginRest: ""},
    reducers:{
        //setRestaurantsOfStore : (state,action) =>{state.restaurants = action.payload}
    },
    extraReducers: {
        [restaurant.fulfilled]: (state, action) => {
            state.restaurants = action.payload;
            state.isSuccessRest = true;
            state.isLoadingRest = false;
            state.isErrorRest = false;
        },
        [restaurant.pending]: (state, action) => {
            state.isLoadingRest = true;
        },
        [restaurant.rejected]: (state, action) => {
            state.isErrorRest = true;
            state.isLoadingRest = false;
            state.invalidLoginRest = action.payload.message;
        }
    }
})
//export let {setRestaurantsOfStore} = restaurantDetSlice.actions 
export default restaurantDetSlice.reducer
