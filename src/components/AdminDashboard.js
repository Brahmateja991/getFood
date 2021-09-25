import React from 'react'
import { useParams, useRouteMatch, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import AddFoodItems from './AddFoodItems'
import UpdateFoodItems from './UpdateFoodItems'
function AdminDashboard() {
    let allRestaurants = useSelector((state) => state.restaurant)
    let { path, url } = useRouteMatch()
    let linkStyles={
        color:"white",
        backgroundColor:"#1475bb",
        fontWeight:"bold"
    }
    console.log('allRestaurants', allRestaurants)
    return (
        <BrowserRouter>
            <div>
                <h1>AdminDashboard</h1>
                <ul className="nav justify-content-around">
                    <li className="nav-item">
                        <NavLink  className="nav-link" activeStyle={linkStyles} to={`${url}/add-items`}>Add FoodItems</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink  className="nav-link" activeStyle={linkStyles} to={`${url}/update-items`}>View/Update FoodItems</NavLink>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path={`${path}/`}>
                    <AddFoodItems />
                </Route>
                <Route path={`${path}/add-items`}>
                    <AddFoodItems />
                </Route>
                <Route path={`${path}/update-items`}>
                    <UpdateFoodItems />
                </Route>
            </Switch>
        </BrowserRouter>

    )
}

export default AdminDashboard
