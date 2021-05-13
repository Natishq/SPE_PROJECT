const express = require('express');

const router = express.Router();

const {getuserbyid}=require("../controllers/user.js");

const {setPaymentHr,getMyPaymentRequestVendor,acceptPaymentVendor,setPaymentVendor,getMyPaymentRequestWorker,acceptPaymentWorker} = require('../controllers/payments')

router.param("userId",getuserbyid);

// api to set the payment By hR to Vendor 
router.post('/sendPaymentHR/:userId',setPaymentHr)

// api to get all the payments request by vendor

router.get('/getPaymentVendor/:userId', getMyPaymentRequestVendor)

// api for accepting the payment by vendor
router.put('/acceptPaymentVendor/:userId', acceptPaymentVendor)


// -- vendor and worker 

// api to set the payment By Vendor to Worker 
router.post('/sendPaymentVendor/:userId',setPaymentVendor)

// api to get all the payments request by worker
router.get('/getPaymentWorker/:userId', getMyPaymentRequestWorker)

// api for accepting the payment by worker
router.put('/acceptPaymentVendor/:userId', acceptPaymentWorker)

module.exports = router;

