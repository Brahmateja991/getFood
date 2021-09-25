import React from 'react'
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
// import {useHistory } from 'react-router-dom'
function RestaurantRegister() {
    let { register, handleSubmit,  formState: { errors } } = useForm(); 
    let history = useHistory();
    // console.log('in restaurant Registration')  
    let[userRegisterStatus,setUserRegisterStatus]=useState("");
    let [file,setFile] = useState(null)
    // for image select    
    //after image selected
    const onFileSelect = (e) => {
        setFile(e.target.files[0])
    }
    // make req to the backend
    const onRestaurantRegisterFormSubmit = async (userObj)=>{
        // console.log(userObj)
        userObj.status = "blocked";
         //create FOrmData obj
        let formData = new FormData();
        //append image to it
        formData.append('photo', file, file.name)
        //append productObj
         formData.append('userObj', JSON.stringify(userObj))
        //HTTP POST
        let response = await axios.post("/master/req", formData)
        let payload = response.data;
        console.log("after product creation", response.data)
        alert(response.data.message)       
        if(payload.message === "success"){
            // redirect to login
            history.push("/home")
            setUserRegisterStatus('')
        }

        else{
            setUserRegisterStatus("username has alredy taken")
        }
      

    }
    return (
        <div>
            <h1>REGISTER</h1>
       
        <div className="row mt-5">
    {/* user register status */}
    <p className="display-2 text-center text-danger">{userRegisterStatus}</p>
           <form className="col-11 col-sm-8 col-md-6 mx-auto shadow p-3 focus-in-contract" onSubmit={handleSubmit(onRestaurantRegisterFormSubmit)}>
                {/* Restaurentname */}
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="name" 
                      {...register("name",{required :true})}  placeholder="Enter RestaurantName" />
                    <label for="name">Restaurant Name</label>
                </div>
                {/* error */}
                {errors.name?.type==="required" && <p className="alert alert-danger">*Restaurantname is required</p>}
               
              {/* username */}
               <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="username" 
                      {...register("username",{required :true})}  placeholder="Enter UserName" />
                    <label for="username">UserName</label>
                </div>
                {/* error */}
                {errors.username?.type==="required" && <p className="alert alert-danger">*Username is required</p>}
               {/* password */}
               <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="pw" 
                        {...register("password",{required :true})}  placeholder="Enter password" />
                    <label for="pw">Password</label>
                </div>
                {/* error */}
                {errors.password?.type==="required" && <p className="alert alert-danger">*Username is required</p>}
                {/* email */}
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" 
                        {...register("email",{required :true})}  placeholder="Enter UserName" />
                    <label for="email">Email</label>
                </div>
                {/* error */}
               {errors.email?.type==="required" && <p className="alert alert-danger">*email is required</p>}
               {/* RestaurentOwner */}
               <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="ownername" 
                      {...register("ownername",{required :true})}  placeholder="Enter UserName" />
                    <label for="ownername">Restaurant Owner Name</label>
                </div>
               {/* error */}
                {errors.username?.type==="required" && <p className="alert alert-danger">*Username is required</p>}
    
               {/* Contact number */}

               <div class="form-floating mb-3">
                    <input type="text" class="form-control" 
                        id="contactnumber" placeholder="contactnumber"
                        {...register("contactnumber",{required:true,minLength:10})}/>
                    <label for="contactnumber">ContactNumber</label>
                </div>
                {/* error */}

                {errors.contactnumber?.type==="required"&&<p className="alert alert-danger">*Enter your contact number</p>}     

            {/* profile pic */}

                <div class="form-floating mb-3">
                    <input type="file" name="photo" className="form-control mb-3" id="" onChange={onFileSelect}  />
                </div>
                {/* error */}

                {errors.file?.type==="required" && <p className="alert alert-danger">*img is required</p>}


                <div class="mb-3">
                  <label for="discription" class="form-label">Bussiness Justification</label>
                  <textarea class="form-control"  {...register("discription",{required :true})} id="discription" rows="3"></textarea>
                </div>

                {/* error */}

                {errors.discription?.type==="required"&&<p className="alert alert-danger">*Enter Bussiness Justification</p>}
                
    
                <button type="submit" class="btn btn-success float-end mt-3">Submit</button>

            </form>
 
        </div>
    </div>

    )

}




export default RestaurantRegister