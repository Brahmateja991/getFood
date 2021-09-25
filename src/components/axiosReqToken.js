import React from 'react'
import axios from 'axios'

 function AxiosRequestWithToken() {

        // get token
        let token=localStorage.getItem('token')
        let apiUrl="http://localhost:4400"
        // add tokents to headers of req obj
        let axiosReqWithToken=axios.create({
            baseUrl:apiUrl,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

    return axiosReqWithToken;
}

export default AxiosRequestWithToken