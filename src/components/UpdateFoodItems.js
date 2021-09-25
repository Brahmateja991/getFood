import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AxiosRequestWithToken from './axiosReqToken'
function UpdateFoodItems() {
  let [foodItem, setfoodItems] = useState([])
  const { userObj } = useSelector(state => state.user)
  useEffect(async () => {
    console.log('started')
    let axiosToken = await AxiosRequestWithToken();
    let response = await axiosToken.post('/admin/viewfooditems', userObj)
    //let restaurants = response.data.payload
    console.log('resta useEffect', response)
    let allitems = response.data.payload;
    setfoodItems([...allitems])
  }, [])
  const deleteItem = async (index) => {
    let axiosToken = await AxiosRequestWithToken();
    let restObj = foodItem[index]
    let response = await axiosToken.post('/admin/deleteFoodItem', restObj)
    let deleteProducts = response.data;
    if (deleteProducts.message === "product is delete") {
      foodItem.splice(index, 1)
      setfoodItems([...foodItem])
    }
  }
  const editItem = async (index) => {
    let axiosToken = await AxiosRequestWithToken();
    let restObj = foodItem[index];
    if (restObj.status === "available") {
      restObj.status = "unavailable";
    } else {
      restObj.status = "available";
    }
    let response = await axiosToken.post("/admin/editFoodItem", restObj);
    if (response.data.message === "availability changed") {
      foodItem.splice(index, 1, restObj);
      setfoodItems([...foodItem]);
    }
  };
  return (
    <div>
      {/* <h1>Update food items</h1> */}
      <div className="row mt-5">
        {foodItem.map((food, index) => {
          return (
            <div className="col-sm-6 col-md-4 col-lg-3 mt-5" key={index}>
              <div className="card shadow ">
                <img src={food.image} alt="" height="220rem" width="100%" />
                <div className="card-body" key={index}>
                  <h1 className="text-primary">{food.fooditem}</h1>
                  <h1>{food.foodprice}</h1>
                  <h3>{food.value}</h3>
                  {food.status === "available" ? (
                    <h3 className=" text-success">{food.status}</h3>
                  ) : (
                    <h3 className="text-danger">{food.status}</h3>
                  )}
                  <p>{food.discription}</p>
                  <button type="button" class="btn btn-outline-secondary ms-3" onClick={() => editItem(index)}>
                    <img
                      src="https://image.flaticon.com/icons/png/512/1160/1160515.png"
                      alt=""
                      width="25px"
                    />{" "}
                    Update availability status
                  </button>
                  <button type="button" class="btn btn-outline-secondary ms-3" onClick={() => deleteItem(index)}>
                    <img
                      src="https://image.flaticon.com/icons/png/512/3221/3221897.png"
                      alt=""
                      width="25px"
                    />{" "}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default UpdateFoodItems
