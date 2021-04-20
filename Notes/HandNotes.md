#MERN notes 

we have  /Notes/resource in plan.pdf that we are going to use this plan .

# Express

this is the heart of the program that manages the routes and controllers 

``` bash
npm init
npm install express@4.17.1
```

just to initialise the npm repository 

just like maven 



#### nodemon

** only for the dynamic server changes 

```bash
npm install nodemone 
\\ then we are going to make some changes in pacakage.json file
\\ make test to start:"nodemone index.js"
\\ to run npm start
```



## Working with moongose and mongo db  

in the models folder we will define the our database architecture 



We are going to use the Salt for saving our process  

uuid package if used for generating a unique strings for hasing the passwords 



## Connecting to the database 

mongoose.connect('mongodb://localhost:27017/company', 

{

​    useNewUrlParser: true,

​    useUnifiedTopology: true,

​    useCreateIndex:true

}).then( 



​    ()=> { console.log("DB CONNECTED");}

). catch(

​    ()=> { console.log("DB PROBLEM");}

);



#### to hide our project sensitive details we use dotenv precess and we use .env file 

MiddleWare



![image-20210415201843214](/home/tushar/.config/Typora/typora-user-images/image-20210415201843214.png)





Here we need to define the middle funtion as 

```js
const admin = (req,res) => {
    console.log("this is last function");
};

const first= (req,res,next) => {
 console.log("this is new");
next();
}

const isloggedin = (req,res,next) =>{
    console.log("logged")
}

app.get('/admin',isloggedin,first,admin);

// in the express enviroment we use the middle ware by using app.use(function) in order to the respective order

eg --
// a middle ware can change the req and res object 
var express = require('express')
var app = express()

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})
```



for the use of middleware we are going to use the body-parser and cookie parser and cors 

 