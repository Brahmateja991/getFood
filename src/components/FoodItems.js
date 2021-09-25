import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import AxiosRequestWithToken from './axiosReqToken'
import { setCartOfStore } from '../store/cartSlice'
import { useHistory } from 'react-router'
function FoodItems() {
    let { searchFood } = useSelector(state => state.searchFood)
    let foodItems = JSON.parse(JSON.stringify(searchFood))
    let { userObj } = useSelector(state => state.user)
    let { cartItems } = useSelector(state => state.cart)
    let cCartItems = JSON.parse(JSON.stringify(cartItems))
    let history =useHistory();
    let dispatch = useDispatch();
    console.log('userObj',userObj)
    async function addtoCart(ind) {
        if (Object.keys(userObj).length === 0) {
            alert('please login to continue')
            history.push('/login')
        }
        else {
            let axiosToken = await AxiosRequestWithToken();
            let foodItem = foodItems[ind]
            foodItem.username = userObj.username;
            foodItem.quantity = 1
            let response = await axiosToken.post('/users/addtocart', foodItem)
            let count = 0
            if (response.data.message === 'success') {
                await cCartItems.map((cartItem, index) => {
                    if (cartItem.username === foodItem.username && cartItem.restName === foodItem.restName && cartItem.fooditem === foodItem.fooditem) {
                        cartItem.quantity = cartItem.quantity + 1;
                        cCartItems.splice(index, 1, cartItem)
                        console.log('oldupdate Item', cCartItems)
                        dispatch(setCartOfStore(cCartItems))
                        count = 1
                        history.push(`/userdashboard/${userObj.username}/cart-items`)
                    }
                })
                if (count === 0) {
                    cCartItems.push(foodItem)
                    console.log('new ', cCartItems)
                    dispatch(setCartOfStore(cCartItems))
                    history.push(`/userdashboard/${userObj.username}/cart-items`)
                }
            }
        }

    }
    return (
        <div className="container mt-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                {
                    foodItems.map((foodItem, index) => {
                        return <div className="col">
                            <div class="card shadow box" key={index}>
                                <img src={foodItem.image} class="card-img-top" alt="..."  width="120rem" height="220rem"/>
                                <div class="card-body">
                                    <h3 class="card-title">{foodItem.fooditem}</h3>
                                    <h5>Price : {foodItem.foodprice}</h5>
                                    <p class="card-text">{foodItem.description}</p>
                                    <p className="lead"><em>{foodItem.restName}</em></p>
                                    <button className="btn btn-success float-end" onClick={() => addtoCart(index)}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default FoodItems
