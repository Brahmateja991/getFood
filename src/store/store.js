import { configureStore } from "@reduxjs/toolkit"
import restaurantDetSlice from "./restaurantDetSlice"
import userSlice from "./userSlice"
import foodSlice from "./foodSlice"
import cartSlice from "./cartSlice"
import searchSlice from "./searchSlice"
export default configureStore({
    reducer:{
        restaurant : restaurantDetSlice,
        user: userSlice,
        foodItem : foodSlice,
        cart: cartSlice,
        searchFood : searchSlice
    }
})