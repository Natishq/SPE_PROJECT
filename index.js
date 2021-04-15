const express = require("express");

const app = express();

const port = process.env.PORT||8999;

// definig the get methos of http 
// with two methods that we are going to do 
// they are routes and funtion 
app.get( "/",

    (req,res)=>{

        return res.send("the get method returned");
    }

);

app.get("/tushar",
    (req,res) => {

         res.send("tusharshaiy");

    }
);

app.get("/shaily",
    (req,res) => {

         res.send("tusharshaiy");

    }
);

app.listen(port,
    
    () => { 
            return console.log("server startted");
          }    
    );

