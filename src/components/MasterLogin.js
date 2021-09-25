import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";


function MasterLogin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();


  const onMasterAdminLogin = async (masterObj) => {
    let response = await axios.post("/master/login", masterObj);

    let payload = response.data;
    console.log("after product creation", response.data);
    //alert(response.data.message);

    if (payload.message === "success") {
      // redirect to login
      localStorage.setItem('token',payload.token)
      history.push("/masteradmindashboard");
    }
    else {
     alert(response.data.message);
    }
  };

  return (
    <div className="row mt-5">
      {/* {invalidLoginMessage && (
        <h5 className="text-danger text-center">{invalidLoginMessage}</h5>
      )} */}
      <form
        className="col-11 col-sm-8 col-md-6 mx-auto shadow p-3"
        onSubmit={handleSubmit(onMasterAdminLogin)}
      >
        {/* name */}
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="username"
            {...register("username", { required: true })}
            placeholder="Enter Name"
          />
          <label for="username">Username</label>
        </div>
        {/* error */}
        {errors.username?.type === "required" && (
          <p className="alert alert-danger">*Name is required</p>
        )}

        {/* username */}
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            {...register("password", { required: true })}
            placeholder="Enter UserName"
          />
          <label for="password">Password</label>
        </div>
        {/* error */}
        {errors.password?.type === "required" && (
          <p className="alert alert-danger">*Password required</p>
        )}
        <button type="submit" class="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
export default MasterLogin;

