import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const userLogin = createAsyncThunk('login', async (userDetails, thunkAPI) => {

    //make post
    let data;
    console.log('useDetails',userDetails)


    if (userDetails.type === 'User') {
        let response = await axios.post('/users/login', userDetails)
        data = response.data
        console.log(data)

    }
    if (userDetails.type === 'Admin') {
        let response = await axios.post('/admin/login', userDetails)
        data = response.data
        console.log(data)

    }

    if (data.message === "success") {
        // save in local storage
        localStorage.setItem("token", data.token)
        localStorage.setItem('isSuccess',true)
        return data.user;
    }
    console.log('user error', data.message)
    if (data.message === "invalid username" || data.message === "invalid password") {
        //it will provide data to rejected state
        return thunkAPI.rejectWithValue(data.message)
    }
})
const userSlice = createSlice({
    name: "user",
    initialState: {
        userObj: {},
        isSuccessLogin: false,
        isLoadingLogin: false,
        isErrorLogin: false,
        invalidLoginLogin:" "
    },
    reducers: {
        clearLoginStatus: (state) => {
            state.isSuccessLogin = false;
            state.userObj = {}
            return state;
        }
    },
    extraReducers: {
        [userLogin.fulfilled]: (state, action) => {
            state.userObj = action.payload;
            state.isSuccessLogin = true;
            state.isLoadingLogin = false;
            state.isErrorLogin = false;
        },
        [userLogin.pending]: (state, action) => {
            state.isLoadingLogin = true;
        },
        [userLogin.rejected]: (state, action) => {
            state.invalidLoginLogin = action.payload;
            state.isErrorLogin = true;
            state.isLoadingLogin = false;
        }
    }
})

export const { clearLoginStatus } = userSlice.actions
export default userSlice.reducer