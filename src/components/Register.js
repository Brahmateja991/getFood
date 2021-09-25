import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
function Register() {

    let { register, handleSubmit, formState: { errors }, reset } = useForm()

    let [file, setFile] = useState(null)
    const onFileSelect = (e) => {
        setFile(e.target.files[0])
    }

    async function formSubmitInRegister(userData) {
        console.log(userData)
        let formData = new FormData();
        // append image to it        
        formData.append('photo', file, file.name)
        // append productObj
        formData.append('userData', JSON.stringify(userData))
        let response = await axios.post('/users/adduser', formData)
        //console.log('form data:',formData)
        console.log('after user creation', response.data)
        if (response.message === 'success') {
            alert('You are successfully registered')
            reset();
        }
        if (response.message === 'user existed') {
            alert('username already exists try another....')
        }
    }

    return (
        <div className="row mt-2 w-100 h-100 ">  
            <h1 className="text-center focus-in-contracts HN">Register</h1>
            <form className="col-11 col-sm-8 col-md-6 mx-auto shadow-lg user-register p-5 focus-in-contract" onSubmit={handleSubmit(formSubmitInRegister)}>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control"
                        id="email" placeholder="email"
                        {...register("email", { required: true })} />
                    <label for="email">EmailId</label>

                </div>
                {errors.email?.type === "required" && <p className="alert alert-danger">Name is Required</p>}
                <div class="form-floating mb-3">
                    <input type="text" class="form-control"
                        id="username" placeholder="username"
                        {...register("username", { required: true, minLength: 6 })} />
                    <label for="username">Username</label>


                </div>
                {errors.username?.type === "required" && <p className="alert alert-danger">Userame is Required</p>}
                <div class="form-floating mb-3">
                    <input type="password" class="form-control"
                        id="password" placeholder="password"
                        {...register("password", { required: true })} />
                    <label for="password">Password</label>
                </div>

                {errors.password?.type === "required" && <p className="alert alert-danger">*Enter Password</p>}

                <div class="form-floating mb-3">
                    <input type="text" class="form-control"
                        id="contactnumber" placeholder="contactnumber"
                        {...register("contactnumber", { required: true, minLength: 10 })} />
                    <label for="contactnumber">ContactNumber</label>
                </div>
                {errors.contactnumber?.type === "required" && <p className="alert alert-danger">*Enter your contact number</p>}

                <div class="form-floating mb-3">
                    <input type="date" class="form-control"
                        id="dob" placeholder="DOB"
                        {...register("dob", { required: true })} />
                    <label for="dob">DOB</label>
                </div>
                {errors.dob?.type === "required" && <p className="alert alert-danger">DOB is Required</p>}

                <div class="form-floating mb-3">
                    {/* <label for="img">Select an Image:</label> */}
                    <input type="file" class="form-control" id="image" name="photo" onChange={onFileSelect} />
                </div>
                {errors.file?.type==="required" && <p className="alert alert-danger">*img is required</p>}
                <div class="form-check d-flex justify-content-center mb-2">
                    <input
                        class="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                    />
                    <label class="form-check-label" for="form2Example3g">
                        I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                    </label>
                </div>
                <button className="d-block btn btn-success w-50 float-center gradient-custom-4" >Signup </button>


            </form>
        </div>
    )
}

export default Register
