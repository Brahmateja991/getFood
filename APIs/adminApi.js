const express = require("express")
const adminApiObj = express.Router()
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const checkToken = require("../middlewares/checkToken")
const multerObj = require('../middlewares/addimage');


// body parser middleware

adminApiObj.use(express.json())

// let adminCollection;
// get usercollection obj

adminApiObj.use((req, res, next) => {
    adminCollection = req.app.get("adminCollection")
    next()
})


adminApiObj.post('/login', expressAsyncHandler(async (req, res) => {
    // get user credentials
    let adminCredentialObj = req.body;
    console.log('adminapi', adminCredentialObj)
    // find user by username
    let user = await adminCollection.findOne({ username: adminCredentialObj.username })
    // if user is not there
    if (user === null) {
        res.send({ message: "invalid username" })
    }
    else {
        //  compare passwords

        let status = await bcryptjs.compare(adminCredentialObj.password, user.password)
        if (status === false) {
            res.send({ message: "invalid password" })
        }
        // if status is true
        else {
            let signedToken = await jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: 1000 })
            res.send({ message: "success", token: signedToken, user: user })
        }
    }
}))

// add foodItem

adminApiObj.post('/addfooditem', checkToken, multerObj.single('photo'), expressAsyncHandler(async (req, res) => {
    foodCollection = req.app.get('foodCollection')
    const foodItem = JSON.parse(req.body.foodItem)
    foodItem.image = req.file.path;
    console.log('foodItem', foodItem)
    let restName = foodItem.restName
    const foodName = await foodCollection.findOne({ $and: [{ restName: foodItem.restName }, { fooditem: foodItem.fooditem }] })
    if (foodName === null) {
        await foodCollection.insertOne(foodItem)
        res.send({ message: "success" })
    }
    else {
        res.send({ message: "item already exists" })
    }

}))
adminApiObj.post('/viewfooditems', checkToken, expressAsyncHandler(async (req, res) => {
    foodCollection = req.app.get('foodCollection')
    let userObj = req.body
    const foodItems = await foodCollection.find({ restName: req.body.restName}).toArray();
    res.send({ message: "success", payload: foodItems })
}))

adminApiObj.post("/deleteFoodItem", expressAsyncHandler(async (req, res) => {
    // console.log("master Api");
    foodCollection = req.app.get("foodCollection");
    console.log("rest", req.body);
    await foodCollection.deleteOne({ $and: [{ restName: req.body.restName }, { fooditem: req.body.fooditem }] })
    res.send({ message: "product is delete" });
    // console.log("payload",products)
})
);

adminApiObj.post('/editFoodItem', expressAsyncHandler(async (req, res) => {
    foodCollection = req.app.get("foodCollection");
    await foodCollection.updateOne({ $and: [{ name: req.body.name }, { fooditem: req.body.fooditem }] }, { $set: { status: req.body.status } })
    res.send({ message: "availability changed" })

}))

module.exports = adminApiObj;
