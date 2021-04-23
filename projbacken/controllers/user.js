const User = require("../models/user.js");

const Order = require("../models/order.js");
const { rawListeners } = require("npm");

exports.getuserbyid = (req,res,next,id) => {

    User.findById(id).exec( (err,user)=>{
        
        if(err || !user)
        {
            return res.status(400).json({
                error:"NO user found"
            });
        }
        req.profile = user

       next();    
    });
  
    
}

// return the 
exports.getuser = (req,res)=> 
    {
        // TODO : Get back here for password 
        req.profile.salt=undefined;
        req.profile.encry_password=undefined;
        req.profile.createdAt=undefined;
        req.profile.updatedAt=undefined;
        return res.json(req.profile)
    }

    // exports.GetAllUser=(req,res)=>
    // {
    //     User.find({},(err,users)=>{
    //         if(err || !users)
    //         {
    //             return res.json({ error : " not able to fectch "})
    //         }

    //         var userMap = {};

    //           users.forEach(function(user) {
    //              userMap[user._id] = user;
    //             });
             
    //             return res.send(userMap);

    //     })
    // };

    // we have update the 
    exports.updateUser = (req,res) => {
        User.findByIdAndUpdate(
            {_id:req.profile._id},
            {$set:req.body},
            {new : true ,useFindAndModify:false},
            (err,user)=>{
                if(err || ! user)
                {
                    return res.status(400).json({error : " NOT Authorised"});
                }

                user.salt = undefined;
                user.encry_password = undefined;

                return res.json(user);
            }

        )
    }


// here we are showing the userpurchase list by filtering through the orders using the order_id
    exports.userPurchaseList = (req,res) => {
        Order.find({user:req.profile._id}).populate("user","_id name").exec(
            (err,order)=>{
                
                if(err || !order)
                {
                    return res.status(400).json({ error:"error occur at userPurchaseList controller"})
                }

                return res.json(order);
            }
        )
    }

    // now we are trying to maintain the purchase list in user model itself to reduce our search cost 

    exports.pushOrderInPurchseList = (req,res,next)=>{

        let purchase=[];
        req.body.order.products.forEach(product =>{
            purchase.push({
                _id:product._id,
                name:product.name,
                description:product.description,
                categoty:product.categoty,
                quantity:product.quantity,
                amount:req.body.order.amout,
                transaction_id:req.body.order.transaction_id
            })
        })
        
        // now we have to store this in the User model

        User.findOneAndUpdate(
            {_id:req.profile._id},
            {$push : { purchases:purchase}},
            {new:true},
            (err,user)=>{
                if(err)
                {
                    return res.status(400).json({ error: "Error at  pushOrderInPurchseList"})
                }
                next();
            }
        )


    }