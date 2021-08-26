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





// Createproduct/POST /api/products/private,admin
const createProduct=asyncHandler(async(req,res)=>{
    const product=new Product({
        name:'Sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample brand',
        category:'Sample category',
        countInStock:0,
        description:'Sample description',
        numReviews:0,
    })

    const createdProduct=await product.save();
    res.status(201).json(createdProduct);
})





// Updateproduct/PUT /api/products/:id/private,admin
const updateProduct=asyncHandler(async(req,res)=>{
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        numReviews,
    }=req.body;

    const product=await Product.findById(req.params.id);

    if(product){
        product.name=name;
        product.price=price;
        product.image=image;
        product.brand=brand;
        product.category=category;
        product.countInStock=countInStock;
        product.description=description;
        product.numReviews=numReviews;

        const updatedProduct=await product.save();
        res.json(updatedProduct);
    }else{
        res.status(404)
        throw new Error(" Product Not Found");
    }


    
})





export{
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
}