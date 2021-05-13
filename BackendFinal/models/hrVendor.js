const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

/*

its Hr-Vendor pool => HRId , VendorID, Status:boolean 
*/ 

const hrVendorSchema = new mongoose.Schema(

    {
        hr : {
            type:ObjectId,
            ref:"User",
            required:true
        },
        sendBy:{
            type:String
        },
        vendor : {
            type:ObjectId,
            ref:"User",
            required:true
        },

        status : {
            type: Boolean ,
            default:false
        },

    },

    {timestamp:true}

);

// exporting the model
module.exports = mongoose.model('HrVendor',hrVendorSchema);