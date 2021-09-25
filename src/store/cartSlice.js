import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import AxiosRequestWithToken from '../components/axiosReqToken';

export const cartItemsfromDb = createAsyncThunk('cartItemsfromDb', async (userDetails, thunkAPI) => {
    console.log('cart Slice')
    let axiosToken = await AxiosRequestWithToken();
    //make post
    let data;
    
    let response = await axiosToken.post('/users/getcartitems',userDetails)
    if (response.data.message === "success") {
        console.log('response',response)
        return response.data.payload
    }

})

let cartSlice = createSlice({
    name:"cartItems",
    initialState: {cartItems:[],
        isSuccessCart : false,
        isLoadingCart : false,
        isErrorCart : false,
        invalidLoginCart:''},
    reducers:{
        setCartOfStore : (state,action) =>{state.cartItems = action.payload}
    },
    extraReducers: {
        [cartItemsfromDb.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
            state.isSuccessCart = true;
            state.isLoadingCart = false;
            state.isErrorCart = false;
        },
        [cartItemsfromDb.pending]: (state, action) => {
            state.isLoadingCart = true;
        },
        [cartItemsfromDb.rejected]: (state, action) => {
            state.isErrorCart = true;
            state.isLoadingCart = false;
            state.invalidLoginCart = action.payload.message;
        }
    }
})
export let {setCartOfStore} = cartSlice.actions 
export default cartSlice.reducer