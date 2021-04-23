var express = require('express')

var router = express.Router()
const {signout , signup, signin , isSignedIn} = require("../controllers/auth");

const { check , validationResult } = require('express-validator');

// now we are creating a user sign up acoount 

// now we are also use express validator for the validity of the input values 
// go  for express validator docs 

router.post(
    "/signup", 
    check('password').isLength({min:5}).withMessage('Must be minimum length 5') ,
    check('email').isEmail().withMessage('Need proper email'),
    check('name').isLength({min:3}).withMessage('Name should be atleast 3 character') ,
    signup
    );

// now we are creating the routes for the signin 

router.post(
    '/signin',
    check('email').isEmail().withMessage("enter a valid email"),
    check('password').isLength({min:3}).withMessage("enter a password mi length 3"),
    signin
);

router.get("/signout", signout );

router.get("/testroute", isSignedIn,(req,res)=>{
    res.send("protected route");
})

module.exports = router;
