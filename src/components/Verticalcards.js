import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router'
import {searchFoodItemsofStore} from '../store/searchSlice'
function Verticalcards() {
    let {foodItems,isSuccessFood} = useSelector(state=>state.foodItem)
    let [searchFood, setsearchFood] = useState([])
    let dispatch = useDispatch();
    let history = useHistory();
    async function search(value) {
        console.log('value', value)
        const filtered = await foodItems.filter(foodItem => {
            return foodItem.fooditem.toLowerCase().includes(value.toLowerCase()) || foodItem.value.toLowerCase()===(value.toLowerCase()) || value.toLowerCase().includes(foodItem.fooditem.toLowerCase())
           })
           setsearchFood(filtered);
           history.push('/fooditems')
    }
    dispatch(searchFoodItemsofStore(searchFood))
    return (
        <div>
            <div className=" container mt-5 ">
            <h1 className="WDH">Inspiration for your first order</h1>
                {
                    isSuccessFood && 
                    (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4  g-2">
                    <div class="card shadow p-0 " height="568em">
                        <button className="border-0 bg-transparent" onClick={() => search('biryani')}>
                            <img
                                src="https://b.zmtcdn.com/data/homepage_dish_data/4/76d788a2600b609bb0a08443e03df95b.png"
                                class="card-img-top"
                                alt="..."
                                width="100%"
                            />
                            <div>
                                <h5>Biryani</h5>
                            </div>
                        </button>
                    </div>
                    <div class="card shadow " >
                        <button className="border-0 bg-transparent" onClick={() => search('veg')}>
                            <img
                                src="https://imgk.timesnownews.com/story/veg-thali.gif?tr=w-1200,h-900"
                                class="card-img-top rounded w-100"
                                alt="..."
                                width="100%"
                                height="100%"
                            />
                            <div class="card-body">
                                <h5>Veg</h5>
                            </div>
                        </button>
                    </div>
                    <div class="card shadow">
                        <button className="border-0 bg-transparent" onClick={() => search('burger pizza')}>
                            <img
                                src="https://b.zmtcdn.com/data/homepage_dish_data/4/6e69685d22c94ffd42ccd7e70e246bd9.png"
                                class="card-img-top rounded w-100"
                                alt="..."
                                width="100%"
                            />
                            <div class="card-body">
                                <h5>Burger</h5>
                            </div>
                        </button>
                    </div>
                    <div class="card  shadow">
                        <button className="border-0 bg-transparent" onClick={() => search('non-veg')}>
                            <img
                                src="https://b.zmtcdn.com/data/homepage_dish_data/4/742929dcb631403d7c1c1efad2ca2700.png"
                                class="card-img-top rounded w-100"
                                alt="..."
                                width="100%"
                            />
                            <div class="card-body">
                                <h5>Spicy</h5>
                            </div>
                        </button>
                    </div>
                </div>
                    )
                }
            </div>
        </div>
    )
}

export default Verticalcards

