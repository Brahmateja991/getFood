import { useEffect, useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
//import { setRestaurantsOfStore } from '../store/restaurantDetSlice'
import AxiosRequestWithToken from './axiosReqToken'
function MasterDashboard() {
    let allrestaurants = useSelector((state) => state.restaurant)
    console.log('allrestaurants',allrestaurants)
    let dispatch = useDispatch();
    let history = useHistory();
    let [res, setRes] = useState([]);
    let [blockedRes, setblockedRes] = useState([]);
    let [activeRes, setActiveRes] = useState([]);
    let bRes = [], aRes = []
 
    useEffect(async () => {
        console.log('started')
        let axiosToken = await AxiosRequestWithToken();
        let response = await axiosToken.post('/master/restaurants')
        let restaurants = response.data.payload
        console.log('resta useEffect',restaurants)
        setRes([...restaurants])
        console.log('response', restaurants)
        await restaurants.map((restaurant) => {
            if (restaurant.status === 'blocked') {
                bRes.push(restaurant)
            }
            if (restaurant.status === 'active') {
                aRes.push(restaurant)
            }
        })
        setblockedRes([...bRes])
        setActiveRes([...aRes])
        //dispatch(setRestaurantsOfStore(activeRes))
        console.log('end')
    }, [])
    console.log('res', res)
    async function activate(index) {
        let axiosToken = await AxiosRequestWithToken();
        let restaurant = blockedRes[index]
        let adminObj ={}
        console.log('active func', restaurant);
        adminObj.username = restaurant.username
        adminObj.password = restaurant.password
        adminObj.restName = restaurant.name
        restaurant.status = 'active'
        let response = await axiosToken.post('master/addadmin',adminObj)
        console.log('response addadmin',response.data.message)
        if(response.data.message === 'success'){
            blockedRes.splice(index,1)
            activeRes.push(restaurant)
            setblockedRes([...blockedRes])
            setActiveRes([...activeRes])
        }
        await axiosToken.post('master/updateRescoll',restaurant)
        //dispatch(setRestaurantsOfStore(activeRes))
        console.log('active func', restaurant);
        console.log('active adminObj', adminObj);
    }

    async function block(index) {
        let axiosToken = await AxiosRequestWithToken();
        let restaurant = activeRes[index]
        let adminObj ={}
        console.log('active func', restaurant);
        adminObj.username = restaurant.name
        restaurant.status = 'blocked'
        let response = await axiosToken.post('master/deladmin',adminObj)
        console.log('response addadmin',response.data.message)
        if(response.data.message === 'success'){
            activeRes.splice(index,1)
            blockedRes.push(restaurant)
            setblockedRes([...blockedRes])
            setActiveRes([...activeRes])
        }
        await axiosToken.post('master/updateRescoll',restaurant)
        //dispatch(setRestaurantsOfStore([...activeRes]))
    }
    function logOut(){
        localStorage.clear();
        history.push('/home')
    }
    return (
        <div>
            <h1>Welcome Master...</h1>
            <button className='float-end text-danger' onClick={logOut}>Logout<i class="fa fa-sign-out" aria-hidden="true"></i>
</button>
            <div>
                <h3>Active Restaurants</h3>
                {
                    activeRes.length ?
                        (
                            <table class="table table-striped mx-auto w-75">
                                <thead>
                                    <tr>
                                        <th>Name of Restaurant</th>
                                        <th>Name</th>
                                        <th>Contact No.</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        activeRes.map((restaurant, index) => {
                                            return <tr key={index}>
                                                <td>{restaurant.name}</td>
                                                <td>{restaurant.username}</td>
                                                <td>{restaurant.contactnumber}</td>
                                                <td>{restaurant.email}</td>
                                                <td>{restaurant.discription}</td>
                                                <td><button className="btn btn-warning" onClick={() => block(index)}>Block</button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                        :
                        (
                            <p className="lead text-center">No Active resaturants</p>
                        )
                }
            </div>


            <div>
                <h3>Pending Restaurants</h3>
                {
                    blockedRes.length ?
                        (
                            <table class="table table-striped mx-auto w-75">
                                <thead>
                                    <tr>
                                        <th>Name of Restaurant</th>
                                        <th>Name</th>
                                        <th>Contact No.</th>
                                        <th>Email</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        blockedRes.map((restaurant, index) => {
                                            return <tr key={index}>
                                                <td>{restaurant.name}</td>
                                                <td>{restaurant.username}</td>
                                                <td>{restaurant.contactnumber}</td>
                                                <td>{restaurant.email}</td>
                                                <td>{restaurant.discription}</td>
                                                <td><button className="btn btn-success" onClick={() => activate(index)}>Activate</button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                        :
                        (
                            <p className="lead text-center">No pending resaturants</p>
                        )
                }
            </div>
        </div>
    )
}

export default MasterDashboard
