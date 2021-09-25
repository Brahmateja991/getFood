import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { clearLoginStatus, userLogin } from '../store/userSlice'
import { useHistory } from 'react-router-dom'

function Login() {
    let { register, handleSubmit, formState: { errors } } = useForm()
    let dispatch = useDispatch(clearLoginStatus)
    let { isSuccessLogin, userObj, isLoadingLogin, isError, invalidLoginLogin } = useSelector(state => state.user)
    let [userDetailsObj, setUserDetailsObj] = useState({ type: "", username: "", password: "" })
    let history = useHistory();


    function formSubmitInLogin(userDetails) {
        console.log(userDetails)
        setUserDetailsObj({ ...userDetails })
        dispatch(userLogin(userDetails))
    }

    useEffect(() => {
        if (isSuccessLogin && userDetailsObj.type === 'User') {
            history.push(`/userdashboard/${userObj.username}`)
        }
        if (isSuccessLogin && userDetailsObj.type === 'Admin') {
            history.push(`/admindashboard/${userObj.username}`)
        }
    }, [isSuccessLogin, userDetailsObj])
    return (
        <div>
            <h1 className="text-center focus-in-contracts HN">Login</h1>
            {invalidLoginLogin && <h4 className="text-center text-danger">{invalidLoginLogin}</h4>}
            <form className="col-11 col-sm-8 col-md-6 mx-auto shadow p-5 focus-in-contract" onSubmit={handleSubmit(formSubmitInLogin)}>
                {/* radio button */}
                <div>
                    <input type="radio" name="radio" value="Admin" id="Admin" {...register("type")} />
                    <label htmlFor="Admin" className="me-4">admin Login</label>
                    <input type="radio" name="radio" value="User" id="User"
                        {...register("type")} />
                    <label htmlFor="User">user Login</label>
                </div>
                {/* username field */}
                <div class="form-floating mb-3">
                    <input type="text" class="form-control"
                        id="username" placeholder="username"
                        {...register("username", { required: true, minLength: 4 })} />
                    <label for="username">Username</label>
                </div>
                {errors.username?.type === "required" && <p className="alert alert-danger">Userame is Required</p>}

                {/* password field */}
                <div class="form-floating mb-3">
                    <input type="password" class="form-control"
                        id="password" placeholder="password"
                        {...register("password", { required: true })} />
                    <label for="password">Password</label>
                </div>
                {errors.password?.type === "required" && <p className="alert alert-danger">*Enter Password</p>}
                <button className="btn btn-success" >Login</button>{isLoadingLogin && <img src="https://c.tenor.com/wfEN4Vd_GYsAAAAM/loading.gif" alt="" height="38px"/>}

            </form>
        </div>
    )
}

export default Login
