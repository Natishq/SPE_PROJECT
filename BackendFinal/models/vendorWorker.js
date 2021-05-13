const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

/*

its Hr-Vendor pool => HRId , VendorID, Status:boolean , issue part 
*/ 

const vendorWorkerSchema = new mongoose.Schema(

    {
        Vendor : {

            type:ObjectId,
            ref:"User",
            required:true
        },
        
        worker : {
            type:ObjectId,
            ref:"User",
            required:true
        },

        sendBy:{
            type:String
        },

        status : {
            type: Boolean ,
            default:false
        },
        
        issue : {
            type: Boolean ,
            default:false
        },

        HR : {
            type:ObjectId,
            ref:"User",
            default: undefined
        }

    },

    {timestamp:true}

);

// exporting the model
module.exports = mongoose.model('VendorWorker',vendorWorkerSchema);