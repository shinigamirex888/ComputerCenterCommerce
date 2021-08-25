import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';



// GET /products
const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({});
    res.json(products);
})


 // GET /products/:id
const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);   
      
      if(product){
          res.json(product);
      }else{
         res.status(404)
         throw new Error(" Product Not Found");
      }
})






// Delete /products/:id
const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);   
      
      if(product){
          await product.remove();
          res.json({message: 'Product removed'});
      }else{
         res.status(404)
         throw new Error(" Product Not Found");
      }
})


export{
    getProducts,
    getProductById,
    deleteProduct,
}