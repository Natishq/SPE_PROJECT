const User = require("../models/user.js");
const { rawListeners } = require("npm");

exports.getuserbyid = (req,res,next,id) => {

    User.findById(id).exec( (err,user)=>{
        
        if(err || !user)
        {
            return res.status(400).json({
                error:"NO user found"
            });
        }
        // we will add a profile to the user 
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

