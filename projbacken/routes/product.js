const express = require('express');

const router = express.Router();

const {GetProductId, GetProduct, CreateProducts, GetP,createProduct} = require('../controllers/product');
const { getuserbyid } = require('../controllers/user');

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
// param filterting 
router.param("productId",GetProductId)
router.param("userId",getuserbyid)


//route for getting the product 
router.get('/product',GetP);

// router for creating the product 
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct)

//router.post('/product/:userId/:productId',isSignedIn, isAuthenticated, isAdmin, CreateProduct)

module.exports = router;
