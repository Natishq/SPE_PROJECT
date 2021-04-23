
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;


const ProductCartSchema = new mongoose.Schema(
    {
        product : {
            type: ObjectId,
            ref:"Product"
        },

        price : Number,
        count : Number,
        name : String 
    }
)

const orderSchema = new mongoose.Schema(

    {
        products : [ProductCartSchema],
        transaction_id:{},
        amount : { type:Number , default: 0},
        address : String,
        update : Date,
        user : {
            type : ObjectId,
            ref : "User"
        }
        


    },
        {timestamp:true}

    
);

module.exports = mongoose.model('ProductCart',ProductCartSchema);
module.exports = mongoose.model('Order',orderSchema);
