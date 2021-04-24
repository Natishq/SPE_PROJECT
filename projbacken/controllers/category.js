const category = require('../models/category.js');

exports.getCategoryById =(req,res,next,id)=>{
    category.findById(id).exec((err,catygory)=>{
        if(err || !catygory)
        {
            return res.status(400).json({error : " error in getCategoryById" });
        }

        req.category=catygory;
        next();
    })
}

exports.createCategory= (req,res)=> {
    const Category = new category(req.body);
    Category.save((err,category)=>{
        if(err || !category)
        {
            return res.status(400).json({error : "Not able to save the categoryDB"})
        }
        res.json({category});
    })

}

// to get the particular category 

// to get all the category 
exports.getAllCategory=(req,res)=>{
    category.find().exec((err,elements)=>{
        if(err)
        {
            return res.status(400).json({error: " occurred at getAllCategory"})
        }

        res.json(elements);
    })
}

// to get particualr category 

exports.getCategory=(req,res)=>{
 return res.json(req.category)
}

//controller for the update the catagory 

exports.updateCategory=(req,res)=>{
 const Category = req.category;
 // there is only one thing in the category object
 Category.name=req.body.name;
 Category.save((err,element)=>{
        if(err)
        {
            return res.status(400).json({error: " occurred at updateCategory"})
        }

        res.json(element);
    })
};

exports.deleteCategory=(req,res)=>{
    const Category = req.category;
    Category.remove((err,element)=>{
        if(err)
        return res.status(400).json({error:" error at deleteCategory"})

        res.json({error:`Successfully deleted ${req.category.name}`})
    });

};