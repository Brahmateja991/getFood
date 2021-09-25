const exp = require('express')
const app = exp();
const path = require('path')
require('dotenv').config();

//connecting to build
app.use(exp.static(path.join(__dirname, './build')))

//import APIs
const userApiObj = require('./APIs/userApi')
const masterApiObj = require('./APIs/masterApi')
const adminApiObj = require('./APIs/adminApi')
//deling with unknown url paths during refresh
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
})

//transfer to api
app.use('/users', userApiObj);
app.use('/master', masterApiObj);
app.use('/admin',adminApiObj)
//import mongoclient
let mongoclient = require('mongodb').MongoClient
const dbURL = process.env.DATABASE_URL

//connect to db
mongoclient.connect(dbURL, (err, client) => {
    if (err) {
        console.log('error occured while connecting to db', err.message)
    }
    else {
        // create db instance
        let dbObj = client.db('foodApp')
        //create collection instance
        let userCollection = dbObj.collection('usercollection')
        let restaurantReqCollection = dbObj.collection('restaurantReqcollection')
        let adminCollection = dbObj.collection('admincollection')
        let masteradminCollection = dbObj.collection('masterAdmincollection')
        let foodCollection = dbObj.collection('foodcollection')
        let cartCollection = dbObj.collection('cartcollection')
        //set collections to apis
        app.set('userCollection', userCollection)
        app.set('restaurantReqCollection', restaurantReqCollection)
        app.set('adminCollection',adminCollection)
        app.set('masteradminCollection',masteradminCollection)
        app.set('foodCollection',foodCollection)
        app.set('cartCollection',cartCollection)
        console.log('connected to DB')
    }
})

app.use((err, req, res, next) => { console.log('glo error occured', err) })


PORT = process.env.PORT
app.listen(PORT, console.log(`server at ${PORT}`))