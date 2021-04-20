// we can define the router action function here 

exports.signout  = (req,res)=>{

    res.json({
        user : "tumun",
        name : "shaily"
    });
};

// we are creating the user in our database so we need our user model 
// we will inport our model class to it 
const User = require("../models/user");

exports.signup = (req,res)=> {
  const user = new User(req.body);
  user.save((err,user)=>{
    if(err)
    {
        return res.status(400).json({
            message : "Not able to right"
        })
    }
    return res.json({
        name : user.name ,
        email: user.email,
        id : user._id  
    });

  });
};

