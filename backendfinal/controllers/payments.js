const PaymentHrVendor = require('../models/paymentHrVendor')

const PaymentVendorLabour = require('../models/paymentVendorLabour')

// payment given by the Hr
exports.setPaymentHr = (req,res)=>{
    const data = {
        transaction:req.body.transaction,
        HR:req.params.userId,
        Vendor:req.body.vendor,
        request:true
    }
    try
    {
    PaymentHrVendor.create(data,(err,data)=>{
        if(err){
            return res.status(400).json({
                err:"not able to send request"
            })
        }
        res.json({
            message:"request sent successfully",
            data
        })
    })
    }
    catch(err)
    {
        res.status(400).json({
            error:err
        });
    }

}

exports.getMyPayment = (req,res)=>{
    PaymentHrVendor.find({ Vendor:req.params.userId,request:true}).exec(
        (err,data)=>{
        if(err)
        {
            res.json({
                message:err
            })
        }
        else if(data.length == 0) 
        {

        }
        else
        {
            res.json({
                message:"request accepted",
                data
            })
        }
    })
    
}
exports.acceptPaymentVendor = (req,res)=>{
    PaymentHrVendor.findOneAndUpdate({ HR:req.body.hr,Vendor:req.params.userId,request:true},{status:true},
        (err,data)=>{
        if(err)
        {
            res.json({
                message:err
            })
        }
        else
        {
            res.json({
                message:"request accepted",
                data
            })
        }
    })

}




// vendor giving payment
exports.setPaymentVendor = (req,res)=>{
    const data = {
        transaction:req.body.transaction,
        HR:req.body.hr,
        Vendor:req.params.userId,
        worker:req.params.worker,
        request:true
    }
    try
    {
    PaymentVendorLabour.create(data,(err,data)=>{
        if(err){
            return res.status(400).json({
                err:"not able to send request"
            })
        }
        res.json({
            message:"request sent successfully",
            data
        })
    })
    }
    catch(err)
    {
        res.status(400).json({
            error:err
        });
    }
}

exports.getMyPaymentRequestWorker = (req,res)=>{
    PaymentVendorLabour.find({ worker:req.params.userId,request:true}).exec(
        (err,data)=>{
        if(err)
        {
            res.json({
                message:err
            })
        }
        else if(data.length == 0) 
        {

        }
        else
        {
            res.json({
                message:"request accepted",
                data
            })
        }
    })
    
}
exports.acceptPaymentWorker = (req,res)=>{
    PaymentVendorLabour.findOneAndUpdate({ HR:req.body.hr, Vendor:req.body.vendor, worker:req.params.userId,request:true},{status:true},
        (err,data)=>{
        if(err)
        {
            res.json({
                message:err
            })
        }
        else
        {
            res.json({
                message:"request accepted",
                data
            })
        }
    })

}