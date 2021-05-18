const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

/*

its paymentHr-Vendor pool => HRId , VendorID, Status:boolean ,  
*/ 

const paymentHrVendorSchema = new mongoose.Schema(

    {
        Vendor : {

            type:ObjectId,
            ref:"User",
            required:true
        },
        
        HR : {
            type:ObjectId,
            ref:"User",
            required:true
        },

        status : {
            type: Boolean ,
            default:false
        },
        
        request : {
            type: Boolean ,
            default:false
        },

        transaction : {
            type:String,
            require:true
        }

    },

    {timestamp:true}

);

// exporting the model
module.exports = mongoose.model('PaymentHrVendor',paymentHrVendorSchema);