

const HrVendor = require('../models/hrVendor');




exports.getRequestHr = (req,res) =>{
        HrVendor.find({hr:req.params.userId,status:false}).exec((err,data)=>{
            if(err){
                return res.status(400).json({
                    err :"not able to get"
                })
            }
            res.json(data);
        })
    }
    

exports.getRequestHrFriends = (req,res) => {

    HrVendor.find({hr:req.params.userId,status:true}).exec((err,data)=>{
            if(err){
                return res.status(400).json({
                    err :"not able to get"
                })
            }
            res.json(data);
        })
}


// we have to use the worker - vendor pool

const VendorWorker = require('../models/vendorWorker');

exports.getRequestWorker = (req,res) => {
      VendorWorker.find({ Vendor:req.params.userId,status:false}).exec((err,data)=>{
            if(err){
                return res.status(400).json({
                    err :"not able to get"
                })
            }
            res.json(data);
        })
    
}

exports.getRequestWorkerFriend = (req,res) => {
      VendorWorker.find({ Vendor:req.params.userId,status:true}).exec((err,data)=>{
            if(err){
                return res.status(400).json({
                    err :"not able to get"
                })
            }
            res.json(data);
        })
    
}
