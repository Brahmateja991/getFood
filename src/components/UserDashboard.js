import React, { useEffect } from 'react'
import { useParams, useRouteMatch, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import ViewFoodItems from './ViewFoodItems'
import Cart from './Cart'
import { cartItemsfromDb } from '../store/cartSlice'
import FoodItems from './FoodItems'
function UserDashboard() {
    const { userObj } = useSelector(state => state.user)
    let { searchFood } = useSelector(state => state.searchFood)
    let { cartItems } = useSelector(state => state.cart)
    console.log('userObj from', userObj)
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(cartItemsfromDb(userObj))
    }, [])
    let { path, url } = useRouteMatch()
    let activeLinkStyles = {
        fontWeight: "bold",
        color: '#bb09bb'
    }
    return (
        <div>
            <div className="d-block p-auto justify-content-end">
                {/* this for welcome with name */}
                <h3 className="text-end d-inline WDH">
                    Welcome{" "}<span className="text pr-2 FIN "><strong>{userObj.username}</strong></span>
                </h3>
                <img
                    src={userObj.image}
                    alt=""
                    className="rounded-circle"
                    width="70px"
                />
            </div>
            <BrowserRouter>
                <div>
                    <ul className="nav justify-content-around">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`${url}/view-items`} activeStyle={activeLinkStyles}>View FoodItems</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className="nav-link" to={`${url}/cart-items`} activeStyle={activeLinkStyles}>Cart
                                <img src="https://cdn-icons-png.flaticon.com/512/3594/3594363.png" height="30px" width="30px" alt="" />
                                <sup className="text-success"><strong>{cartItems.length}</strong></sup> </NavLink>
                        </li>
                    </ul>
                </div>
                <Switch>
                    {
                        searchFood.length !== 0 ? (
                            <Route exact path={`${path}`}>
                                <FoodItems />
                            </Route>
                        ) : (
                            <Route exact path={`${path}`}>
                                <ViewFoodItems />
                            </Route>
                        )
                    }
                    <Route path={`${path}/view-items`}>
                        <ViewFoodItems />
                    </Route>
                    <Route path={`${path}/cart-items`}>
                        <Cart />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>

    )
}

export default UserDashboard
