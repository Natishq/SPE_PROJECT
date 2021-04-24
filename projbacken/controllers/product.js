const Product = require('../models/product')
const formidable = require('formidable');

// will also need lodash 
const _ = require("lodash");

const fs = require("fs");


exports.GetProductId = (req,res,next,id)=>{

    // here we are populating the product so that it contains the category also 

    Product.findById(id).populate("category").exec((err,element)=>{
        if(err || !element)
        {
            return res.status(400).json({ error:"error Occured at GetProductId"});
        }
        req.product = element;
        next();  
    })
}

exports.GetProduct = (req,res) => {
    res.json(req.product)
}

exports.GetP = (req,res)=>{
    return res.json({ message:"route working"})
}

exports.CreateProducts = (req,res) => {
    
    // the body will have the all the parameter which are send in post request in the form way  
    
    let form = new formidable.IncomingForm();

    form.keepExtentions = true;

    // fields - > it is regarding the parameter that we are passing in the form which has fileds and its value  
    // files 
    form.parse(req, (err,fields,file)=>{
        
        if(err)
        {
            return res.status(400).json({error : "problem with images "});
        }

        
        //TODO: restriction on fields -> what type of values that we are excepting 
        // now we are going to have simple restriction for the feilds
        // destructuring the data 
        const {name,description,price,category,stock } = fields

        if(!name || !price || !category || !description || !stock)
        {
            return res.status(400).json({ error:"Some fields are not present"});
        }
        let  product = new Product(fields);

        // handel file here
        try
        { 
            if(file.photo)
            {
                if(file.photo.size > 3000000)
                {
                    return res.status(400).json({ error : "file Size to big"});
                }

                product.photo.data = fs.readFileSync(file.photo.path);
                product.photo.contentType = file.photo.type;
            }
        }
        catch(err)
        {
            return res.status(400).json({ error: "error occured at saving pic"});
        }

        // saving the model to the db
        product.save((err,element)=>{
            if(err || !element)
            {
                return res.status(400).json({ error: "product saving fail"});
            }
            res.json(product);
        })
    }) 

}
