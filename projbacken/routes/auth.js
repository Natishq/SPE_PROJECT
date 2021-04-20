var express = require('express')

var router = express.Router()
const {signout , signup} = require("../controllers/auth");

// now we are creating a user sign up acoount 
router.post("/signup",signup);

router.get("/signout", signout );

module.exports = router;
