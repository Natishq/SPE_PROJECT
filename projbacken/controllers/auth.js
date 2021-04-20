// we can define the router action function here 
const { check , validationResult } = require('express-validator');
const user = require('../models/user');

// for creating the token 
var jwt = require('jsonwebtoken');

// for stroing the token in the cookie 

var expressJwt = require('express-jwt');

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

    const errors = validationResult(req);
    
    if(!errors.isEmpty())
    {   // 422 error is useful for the database error request
        ans = [];

        errors.array().forEach( element => {
        x = {message: element.msg , parameter :element.param }
        ans.push(x);     
        });

        return res.status(422).json({

            error: ans 

        });
    }

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

exports.signin = (req,res) => {

    const error = validationResult(req);

    // error handing 
    if(!error.isEmpty())
    {
        ans = [];

        error.array().forEach(element =>{
        x = {message: element.msg , parameter :element.param }
        ans.push(x);   
        });

        return res.status(422).json({
            error: ans
        });
    }


    // we are going to find the user in the database with the given  

    // we are going to destructure the data from the req.body => body-parser part

    const { email , password } = req.body;

    User.findOne({email}, (err,user) => {

        if(err)
        {
            return res.status(422).json({ error : "email  not register "});
        }

        if(!user.authenticate(password))
        {
            return res.status(422).json({ error : "Email password didnt match"});
        }

        // token is creted 
        var token = jwt.sign({ _id : user._id }, process.env.SECRATE);

        // putting token in the cookie

        res.cookie("token",token,{expire : new Date()+9999});
        
        // sending the response to the frontend

        const {_id, name , email , role} = user ;
        return res.json({
            token, 
            user : {_id,name,email,role}
        });

    });



}

