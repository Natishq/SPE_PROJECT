
const express = require('express');

const router = express.Router();

const { getuserbyid ,getuser,updateUser,userPurchaseList}=require("../controllers/user.js");

const { isAdmin,isSignedIn,isAuthenticated }=require("../controllers/auth.js");
// note for the param in express 
// whenever we user:id then it will take that id and add user profile in req body

// this param will take that that userid in the URL and then parse into 
router.param("userId",getuserbyid);

router.get('/user/:userId',isSignedIn,isAuthenticated, getuser);

//router.get('/user',GetAllUser)
router.put('/userupdate/:userId',isSignedIn,isAuthenticated,updateUser)

router.get('/purchase/:userId',isSignedIn,isAuthenticated,userPurchaseList);

module.exports = router; 

