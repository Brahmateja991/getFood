import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FoodItems from './FoodItems'
import AxiosRequestWithToken from './axiosReqToken'
import { setCartOfStore } from '../store/cartSlice'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
function ViewFoodItems() {
    let { username } = useParams()
    let { restaurants } = useSelector(state => state.restaurant)
    let { foodItems } = useSelector(state => state.foodItem)
    let { userObj } = useSelector(state => state.user)
    let { cartItems } = useSelector(state => state.cart)
    let dispatch = useDispatch();
    let history = useHistory();
    let cFoodItems = JSON.parse(JSON.stringify(foodItems))
    let cCartItems = JSON.parse(JSON.stringify(cartItems))
    console.log('cCartItems', cCartItems)
    console.log('restaurants', restaurants)
    console.log('foodItems', foodItems)
    async function addtoCart(ind) {
        let axiosToken = await AxiosRequestWithToken();
        let foodItem = cFoodItems[ind]
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
                    history.push(`/userdashboard/${username}/cart-items`)
                }
            })
            if (count === 0) {
                cCartItems.push(foodItem)
                console.log('new ', cCartItems)
                dispatch(setCartOfStore(cCartItems))
                history.push(`/userdashboard/${username}/cart-items`)
            }
        }

    }
    return (
        <div className="container">
            {/* <h1>View Food Items</h1> */}
            {
                //restaurants.filter((restaurant)=>(restaurant.status==='active')).map(())
                restaurants.map((restaurant, index) => {
                    return (

                        restaurant.status === 'active' ?
                            <>
                                {/* <div className="text center">

                    </div> */}
                                <h2 className="text-center mt-5 mb-2 RN">
                                    {/* <img src="https://www.flaticon.com/premium-icon/food-tray_3073843" alt="" width="20px" height="20px" /> */}
                                    <strong><em><u>{restaurant.name}</u></em></strong>
                                    {/* <img src="https://www.flaticon.com/free-icon/delivery_3063822" alt="" width="20px" height="20px" /> */}
                                </h2>

                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-2">
                                    {cFoodItems.map((foodItem, index) => {
                                        return (
                                            (foodItem.restName === restaurant.name && foodItem.status === 'available') && (
                                                <div className="col">
                                                    <div class="card shadow box" key={index}>
                                                        <img src={foodItem.image} class="card-img-top" alt="..." width="120rem" height="220rem" />
                                                        <div class="card-body">
                                                            <h3 class="card-title">{foodItem.fooditem}</h3>
                                                            <h5>{foodItem.foodprice}₹</h5>

                                                            <p class="card-text">{foodItem.description}</p>
                                                            <button className="btn float-end" onClick={() => addtoCart(index)}>
                                                                <img src="https://cdn-icons-png.flaticon.com/512/4379/4379876.png" height="30px" width="30px" alt="" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    })
                                    }
                                </div>
                            </>

                            : (console.log('this is false')))
                })
            }
        </div>
    )
}

export default ViewFoodItems




