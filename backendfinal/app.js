
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const cookieParser = require("cookie-parser");

const cors = require("cors");

// we didnt use bpdy parser we used expressurlencoded 

// connection to mongo

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

const app = express();

// using middleware
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());
 app.use(cors());
 app.use(cookieParser());


// importing the routes 

const author = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const invite = require("./routes/HrVendor.js");


// using the routes

app.use('/api',author);
app.use('/api',userRoutes);
app.use('/api',invite);



// using custom middleware
const isAdmin = (req,res,next) => {
    console.log("this is admin middleware");
    next();
} 

const admin = (req,res)=>{
    res.send("this is admin");
}

app.get("/admin",isAdmin,admin);

// implementing the app

const port = process.env.PORT||8000;

app.listen(port,
    
    () => { 
            console.log(`server started ${port}`);
          }    
    );
