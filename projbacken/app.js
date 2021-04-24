// for the .env method that we need 
require('dotenv').config()

// connecting to the database 

const mongoose = require('mongoose');

const express = require('express');



 const cookieParser = require("cookie-parser");

const cors = require("cors");


const app = express();

// using my define author routes 
const author = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product");

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

// this is middleeares
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());
 app.use(cors());
 app.use(cookieParser());


// my routes
// all my routes in this use will be prefix /api
app.use('/api',author);
app.use('/api',userRoutes); // <- we have imported the routes see line 21
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);



// javascript myfunctionRun().then(if its run ).catch(if there is any problem );

const port = process.env.PORT||9001;

// now we are going to use the middleware with the routes that are define 

const isAdmin = (req,res,next) => {
    console.log("this is admin middleware");
    next();
} 

const admin = (req,res)=>{
    res.send("this is admin");
}

app.get("/admin",isAdmin,admin);

// definig the routes 

app.listen(port,
    
    () => { 
            console.log(`server startted ${port}`);
          }    
    );

