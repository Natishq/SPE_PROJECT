// for the .env method that we need 
require('dotenv').config()

// connecting to the database 

const mongoose = require('mongoose');

const express = require('express');

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const cors = require("cors");
const { cookie } = require('express-validator');

const app = express();

// connection to the mongoose 
mongoose.connect(process.env.DATABASE, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then( 

    ()=> { console.log("DB CONNECTED");}
). catch(
    ()=> { console.log("DB PROBLEM");}
);


app.use(bodyParser.json());
app.use(cors);
app.use(cookieParser);



// javascript myfunctionRun().then(if its run ).catch(if there is any problem );

const port = process.env.PORT||8990;

// now we are going to use the middleware with the routes that are define 

const isAdmin = (req,res,next) => {
    console.log("this is admin middleware");
    next();
} 

const admin = (req,res)=>{
    res.send("this is admin");
}

app.get("/admin",isAdmin,admin);

app.listen(port,
    
    () => { 
            console.log(`server startted ${port}`);
          }    
    );
