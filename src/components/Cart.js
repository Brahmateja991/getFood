import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCartOfStore } from '../store/cartSlice'
import AxiosRequestWithToken from './axiosReqToken'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
function Cart() {
    let sum = 0;
    let history = useHistory();
    let { username } = useParams()
    let { cartItems } = useSelector(state => state.cart)
    let dispatch = useDispatch();
    let cCartItems = JSON.parse(JSON.stringify(cartItems))
    cCartItems.map((cartItem) => {
        sum = sum + (cartItem.foodprice * cartItem.quantity)
    })
    console.log('ccartItems', cCartItems)
    async function decQty(index) {
        let axiosReqToken = await AxiosRequestWithToken();
        let cartItem = cCartItems[index]
        cartItem.quantity = cartItem.quantity - 1
        if (cartItem.quantity <= 0) {

            cCartItems.splice(index, 1)
            dispatch(setCartOfStore(cCartItems))
            await axiosReqToken.post('/users/deletecartitem', cartItem)
        }
        else {

            cCartItems.splice(index, 1, cartItem)
            dispatch(setCartOfStore(cCartItems))
            await axiosReqToken.post('/users/updatecartitem', cartItem)
        }
    }
    async function incQty(index) {
        let axiosReqToken = await AxiosRequestWithToken();
        let cartItem = cCartItems[index]
        cartItem.quantity = cartItem.quantity + 1
        if (cartItem.quantity <= 0) {
            cCartItems.splice(index, 1)
            dispatch(setCartOfStore(cCartItems))
        }
        else {

            cCartItems.splice(index, 1, cartItem)
            dispatch(setCartOfStore(cCartItems))
            await axiosReqToken.post('/users/updatecartitem', cartItem)
        }
    }
    async function remove(index) {
        let axiosReqToken = await AxiosRequestWithToken();
        let cartItem = cCartItems[index]
        cCartItems.splice(index, 1)
        dispatch(setCartOfStore(cCartItems))
        await axiosReqToken.post('/users/deletecartitem', cartItem)
    }
    function addItems() {
        history.push(`/userdashboard/${username}/view-items`)
    }
    return (
        <div className="container">
            <div className="row g-3">
                <div className="col-md-8 col-lg-9">
                    {
                        cCartItems.map((cartItem, index) => {
                            return (
                                <div class="card mb-3 mx-auto shadow" key={index}>
                                    {/* width="600px" height="280px" */}
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src={cartItem.image} class="img-fluid rounded-start" alt="..." height="100%" width='100%' />
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h2 class="card-title text-primary">{cartItem.fooditem}</h2>
                                                <h4 className="card-text">{cartItem.restName}</h4>
                                                {cartItem.value === 'veg' ? (<p class="card-text text-success">{cartItem.value}</p>) : (<p class="card-text text-danger">{cartItem.value}</p>)}
                                                <h4>Price(1 qty) : {cartItem.foodprice}</h4>
                                                <h4>Final Price : {cartItem.foodprice * cartItem.quantity}</h4>
                                                <button className="btn" onClick={() => decQty(index)}> - </button> {cartItem.quantity} <button className="btn" onClick={() => incQty(index)}> + </button>
                                                <button className="btn btn-danger float-end" onClick={() => remove(index)}>Remove from cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    cCartItems.length !== 0 ?
                        <div className="col-md-4 col-lg-3">
                            <div class="card">
                                <div class="card-header text-center">
                                    Cart summary
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Total Items : {cCartItems.length}</li>
                                    <li class="list-group-item">Total Price :{sum}</li>
                                    <li class="list-group-item">Discount : {sum >= 500 ? '15%' : '10%'}</li>
                                    <li className="list-group-item">Final Price : {sum >= 500 ? (sum * 0.85) : (sum * 0.9)}</li>
                                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Check Out</button>
                                </ul>
                            </div>
                            <button className="btn btn-primary" onClick={addItems}>Add more Items</button>
                        </div> :
                        <div>
                            <h2>Oops your cart is empty.....</h2>
                            <button className="btn btn-primary" onClick={addItems}>Add Items</button>
                        </div>
                }

            </div>
            {/* modal..... */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Order has been successfully placed..... <img src="https://cdn-icons-png.flaticon.com/512/864/864837.png" alt="" width="25px"/></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p className="lead">Waiting for delivery person to pickup your order</p>
                            <img
                                src="https://c.tenor.com/LeSVOZJUt-oAAAAM/muuve-rider.gif"
                                className="mx-auto d-block"
                                width="250px"
                                height="300px"
                                alt=""
                            />
                            <div>
                            <button type="button" class="btn btn-secondary float-end" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart
