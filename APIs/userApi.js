const express = require('express');
//create express mini app
const userApiObj = express.Router();
//jwt
const jwt=require("jsonwebtoken")
//express async handler
const expressAsyncHandler = require('express-async-handler');
//import multerObj
const multerObj = require('../middlewares/addimage');
//checkToken
const checkToken = require("../middlewares/checkToken")
//parser
userApiObj.use(express.json())
//becryptjs
const bcryptjs=require('bcryptjs')
let userCollection
// import usercollection instance
// userApiObj.use((req, res, next) => {
//     userCollection = req.app.get("userCollection")
//     next();
// })

//add user
userApiObj.post("/adduser",multerObj.single('photo'), expressAsyncHandler(async (req, res) => { //
    //get product
    //userObj = req.body
    userCollection = req.app.get("userCollection")
    console.log('userApi', req.body.userData)
    const userObj = JSON.parse(req.body.userData)
    //add image CDN link
    userObj.image = req.file.path;

    // check duplicate users
    const user = await userCollection.findOne({username:userObj.username})
    //console.log('user',user)
    if(user !== null){
        res.send({message:'user existed'})
    }
    else{
    //save to usercollection
    //userApiObj.use(multerObj.single('photo'))
    //userObj.image = req.file.path;
    let hashedPw =await bcryptjs.hash(userObj.password,6)
    userObj.password = hashedPw;
    console.log('userApi userObj',userObj)
    await userCollection.insertOne(userObj)
    //send res
    res.send({ message: "success",data:userObj })
    }
    //console.log('user APi userObj',userObj)

}))

userApiObj.post('/login',expressAsyncHandler(async (req,res)=>{
    // get user credentials
    userCollection = req.app.get("userCollection")
    let userDetailsObj=req.body;
    console.log(userDetailsObj)
    // find user by username
    let user = await userCollection.findOne({username:userDetailsObj.username})
    // if user is not there
    if(user===null){
        res.send({message:"invalid username"})
    }
    else{
        //  compare passwords
        let status = await bcryptjs.compare(userDetailsObj.password,user.password)
        // if not equal
        if(status=== false){
            res.send({message:"invalid password"})
        }
        // if status is true
        else{
            let signedToken= await jwt.sign({username:user.username},process.env.SECRET)
            res.send({message:"success",token:signedToken,user:user})
        }
    }

}))

userApiObj.post('/getrestaurants',expressAsyncHandler(async(req,res)=>{
    console.log('inside userApi getrestaurants')
    restaurantReqCollection = req.app.get('restaurantReqCollection')
    let response= await restaurantReqCollection.find({status:'active'}).toArray()
    res.send({message:'success',payload:response})
    //console.log(response)
}))

userApiObj.post('/getfooditems',expressAsyncHandler(async(req,res)=>{
    console.log('inside userApi getFood')
    foodCollection = req.app.get('foodCollection')
    let response= await foodCollection.find().toArray()
    res.send({message:'success',payload:response})
    //console.log(response)
}))

userApiObj.post('/addtocart',checkToken,expressAsyncHandler(async(req,res)=>{
    cartCollection = req.app.get('cartCollection')
    let cartItem = await cartCollection.findOne({$and: [{fooditem: req.body.fooditem},{restName: req.body.restName},{username: req.body.username}]})
    if(cartItem !== null){
        let response = await cartCollection.updateOne({$and: [{fooditem: req.body.fooditem},{restName: req.body.restName},{username: req.body.username}]},{$set:{quantity: cartItem.quantity + 1}})
        res.send({message: 'success', payload: 'Item is updated in the cart'})
    }
    else{
        let response = await cartCollection.insertOne(req.body)
        res.send({message:'success'})
    }
    //console.log('req.body',req.body)

}))

userApiObj.post('/getcartitems',checkToken,expressAsyncHandler(async( req,res)=>{
    cartCollection = req.app.get('cartCollection')
    //console.log('req.body',req.body)
    let response = await cartCollection.find({username: req.body.username}).toArray();
    res.send({message:"success",payload: response})
}))

userApiObj.post('/updatecartitem',checkToken,expressAsyncHandler(async (req, res)=>{
    cartCollection = req.app.get('cartCollection')
    console.log('req.body update',req.body)
    await cartCollection.updateOne({$and: [{fooditem: req.body.fooditem},{restName: req.body.restName},{username: req.body.username}]},{$set:{quantity: req.body.quantity}})
}))
userApiObj.post('/deletecartitem',checkToken,expressAsyncHandler(async(req,res)=>{
    cartCollection = req.app.get('cartCollection')
    console.log('req.body update',req.body)
    await cartCollection.deleteOne({$and: [{fooditem: req.body.fooditem},{restName: req.body.restName},{username: req.body.username}]})
}))















module.exports = userApiObj