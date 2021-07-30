import express from 'express';
const router=express.Router();
import {getProducts,getProductById} from"../controllers/productController.js"



// GET /products
router.route('/').get(getProducts);
  
  // GET /products/:id
  router.route('/:id').get(getProductById);




export default router;