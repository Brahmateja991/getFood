import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import RegisterRestaurant from './components/RegisterRestaurant'
import MasterDashboard from './components/MasterDashboard'
import MasterLogin from './components/MasterLogin'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import FoodItems from './components/FoodItems'
import ViewFoodItems from './components/ViewFoodItems'
import { useSelector, useDispatch } from 'react-redux'
import { clearLoginStatus } from './store/userSlice'
import { restaurant } from './store/restaurantDetSlice'
import { foodItemsfromDb } from './store/foodSlice'
function App() {
  let { isSuccessLogin, userObj } = useSelector(state => state.user)
  let Success = localStorage.getItem('isSuccess')
  console.log('Success', Success)
  let dispatch = useDispatch();

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);


  // loading content to store
  useEffect(() => {
    dispatch(restaurant());
    dispatch(foodItemsfromDb());
  }, [])
  // logout
  function logout() {
    localStorage.clear();
    dispatch(clearLoginStatus());
  }
  let activeLinkStyles = {
    fontWeight: "bold",
    color: '#bb09bb'
  }

  return (
    <div className="container-fluid">
      <BrowserRouter>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand">getFood</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

              <ul className="navbar-nav">
                {!Success ? (
                  <>
                    <li className="navi-item">
                      <NavLink activeStyle={activeLinkStyles} className="nav-link" to="/home">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/553/553416.png"
                          width="25px"
                          alt=""
                        />
                        Home
                      </NavLink>
                    </li>
                    <li className="navi-item">
                      <NavLink activeStyle={activeLinkStyles} className="nav-link" to="/register">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2654/2654572.png"
                          width="25px"
                          alt=""
                        />
                        Register
                      </NavLink>
                    </li>
                    <li className="navi-item">
                      <NavLink activeStyle={activeLinkStyles} className="nav-link" to="/login"><img
                        src="https://image.flaticon.com/icons/png/512/2170/2170153.png"
                        alt=""
                        width="25px"
                      />Login</NavLink>

                      {/* <button className="btn" onClick={handleShow}>Login</button> */}
                    </li>
                  </>
                ) : (
                  <>
                    <li className="navi-item">
                      <NavLink activeStyle={activeLinkStyles} className="nav-link" to="/home">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/553/553416.png"
                          width="25px"
                          alt=""
                        />
                        Home
                      </NavLink>
                    </li>
                    <li className="navi-item">
                      <NavLink activeStyle={activeLinkStyles} className="nav-link" to={`/userdashboard/${userObj.username}/view-items`}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1037/1037762.png"
                          width="25px"
                          alt=""
                        />
                        DashBoard
                      </NavLink>
                    </li>
                    <li class="nav-item d-flex justify-content-end">
                      <NavLink
                        className="nav-link"
                        to="/home"
                        onClick={logout}
                      >
                        <img
                          src="https://image.flaticon.com/icons/png/512/1386/1386004.png"
                          alt=""
                          width="25px"
                        />{" "}
                        LogOut
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        {/* <Login show={show} handleClose={handleClose}/> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/fooditems">
            <FoodItems />
          </Route>
          <Route path='/registeryourrestaurant'>
            <RegisterRestaurant />
          </Route>
          <Route path="/masteradminDashboard">
            <MasterDashboard />
          </Route>
          <Route path='/masteradminlogin'>
            <MasterLogin />
          </Route>
          <Route path='/userdashboard/:username'>
            <UserDashboard />
          </Route>
          <Route path='/admindashboard/:username'>
            <AdminDashboard />
          </Route>
          <Route path={`/userdashboard/${userObj.username}/view-items`}>
            <ViewFoodItems />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>

    </div>
  );
}

export default App;
