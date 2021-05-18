const express = require("express");

const router = express.Router();

// send request by vendor 
const {getuserbyid}=require("../controllers/user.js");

const {isSignedIn, isAuthenticated} = require("../controllers/auth")

const {sendByVendor,sendByWorker, acceptRelationHr,acceptRelationVendor , raiseissue , getresult}=require("../controllers/HRVendor");

const {getRequestHr , getRequestHrFriends, getRequestWorker, getRequestWorkerFriend} = require('../controllers/getRequest');
const { route } = require("./auth.js");

router.param("userId",getuserbyid);

// use vendor to send the request to Hr 
router.post('/sendByVendor/:userId',isSignedIn,isAuthenticated,sendByVendor); // working

// api to get all the request by Hr 
router.get('/getRequestHr/:userId',getRequestHr); // working


// api to accept the request for the Hr
router.post('/acceptHr/:userId', acceptRelationHr); // working --> we will get the old copy


// use worker to send the request to the vendor
router.post('/sendByWorker/:userId',isSignedIn,isAuthenticated,sendByWorker); // working

// api for the vendor to accept the request 
router.post('/acceptVendor/:userId', acceptRelationVendor); // working




// api for to get all the request of the workers 
router.get('/getRequestWorker/:userId',getRequestWorker); // working

// api to get all the realtion to vendor
router.get('/getRequestWorkerFriends/:userId',getRequestWorkerFriend); // to be tested 

// api for worker to raise the issue
router.put('/raiseissue/:userId', raiseissue); // to be tested 

//api for Hr to check for the issue regarding the worker
// very important  
router.get('/getresult/:userId',getresult); // to be tested



module.exports = router;