const Product = require('../models/product')
const formidable = require('formidable');

// will also need lodash 
const _ = require("lodash");

const fs = require("fs");


exports.GetProductId = (req,res,next,id)=>{

    // here we are populating the product so that it contains the category also 

    Product.findById(id).populate("Category").exec((err,element)=>{
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


exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //TODO: restrictions on field
    const {name,description,price,category,stock } = fields

        if(!name || !price || !category || !description || !stock)
        {
            return res.status(400).json({ error:"Some fields are not present"});
        }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
    });
  });

};
