const express = require('express');
//create express mini app
const masterApiObj = express.Router()
const checkToken = require('../middlewares/checkToken')
const multerObj = require('../middlewares/addimage');
//jwt
const jwt=require("jsonwebtoken")
//express async handler
const expressAsyncHandler = require('express-async-handler');

//parser
masterApiObj.use(express.json())
//becryptjs
const bcryptjs = require('bcryptjs')

//add user
masterApiObj.post("/req",multerObj.single("photo"), expressAsyncHandler(async (req, res) => {
    restaurantReqCollection = req.app.get('restaurantReqCollection')
    let newUser = JSON.parse(req.body.userObj)
    newUser.profile_pic=req.file.path;
    //  console.log("new user",newUser)
    console.log("new user",newUser)
    // check for duplicate user
    
    // check duplicate users
    const user = await restaurantReqCollection.findOne({ username: newUser.username })
    //console.log('user',user)
    if (user !== null) {
        res.send({ message: 'existed' })
    }
    else {
        //save to restaurantReqcollection
        let hashedPw = await bcryptjs.hash(newUser.password, 6)
        newUser.password = hashedPw;
        console.log('userApi userObj', newUser)
        await restaurantReqCollection.insertOne(newUser)
        //send res
        res.send({ message: "success", data: newUser })
    }
    //console.log('user APi userObj',userObj)
}))
masterApiObj.post(
    "/login",
    expressAsyncHandler(async (req, res) => {
        // gret usercredtial Obj
        let masteradminCredentialsObj = req.body;
        masteradminCollection = req.app.get("masteradminCollection");
        console.log("master", masteradminCredentialsObj);
        // find the user by username
        let user = await masteradminCollection.findOne({
            username: masteradminCredentialsObj.username
        });
        // if username not there
        if (user === undefined) {
            res.send({ message: "invalid username" });
        }
        // if username existed check password
        else {
            // compare password
            let status = masteradminCredentialsObj.password === user.password;
            // if not equal
            if (status === false) {
                res.send({ message: "Invalid Password" });
            }
            // if status is true
            else {
                // create and send token
                let signedToken = await jwt.sign(
                    { username: user.username },
                    process.env.SECRET,
                    { expiresIn: 1000 }
                );
                // send token in res
                res.send({ message: "success", token: signedToken, user: user });
            }
        }
    })
);


masterApiObj.post('/restaurants',checkToken, expressAsyncHandler(async (req, res) => {
    console.log('masterApi for get')
    restaurantReqCollection = req.app.get('restaurantReqCollection')

    let result = await restaurantReqCollection.find().toArray();
    //console.log('result',result)
    res.send({ message: 'success', payload: result })
}))


masterApiObj.post('/addadmin',checkToken, expressAsyncHandler(async (req, res)=>{
    //console.log('masterApi Add admin',req.body)
    adminCollection = req.app.get('adminCollection')
    await adminCollection.insertOne(req.body)
    res.send({message:"success"})
}))

masterApiObj.post('/updateRescoll',checkToken,expressAsyncHandler(async (req,res)=>{
    //console.log('master api resta update',req.body)
    let restaurantDet = req.body
    restaurantReqCollection = req.app.get('restaurantReqCollection')
    await restaurantReqCollection.updateOne({username: restaurantDet.username},{$set:{status: restaurantDet.status}})
}))
masterApiObj.post('/deladmin',checkToken,expressAsyncHandler(async (req, res)=>{
    //console.log('deladmin', req.body)
    let adminDet = req.body
    adminCollection = req.app.get('adminCollection')
    await adminCollection.deleteOne({username:adminDet.username})
    res.send({message:"success"})
}))

















module.exports = masterApiObj