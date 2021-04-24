const express = require('express');

const router = express.Router();

const {getCategoryById, createCategory,getCategory,getAllCategory,updateCategory,deleteCategory} = require("../controllers/category.js")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth.js")
const {getuserbyid} = require("../controllers/user.js")
//params 
router.param('userId',getuserbyid);
router.param('categoryId',getCategoryById);

//actual routes 
// creating a category but we need admin for that
router.post('/category/create/:userId',isSignedIn, isAuthenticated, isAdmin, createCategory);

// to get the category using the param 
router.get('/category/:categoryId',getCategory);

// get  all the category 
router.get('/category/allcategory',getAllCategory);

// updating the category 
router.put('/category/:categoryId/:userId',isSignedIn, isAuthenticated, isAdmin, updateCategory);

// deleting the category 
router.delete('/category/delete/:categoryId/:userId',isSignedIn, isAuthenticated, isAdmin, deleteCategory)

module.exports = router;
