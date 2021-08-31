import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// GET /products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize= 8 
  const page=Number(req.query.pageNumber) || 1;
  
  const keyword=req.query.keyword?{
    name:{
      $regex:req.query.keyword,
      $options:'i'
    }
  }:{}
  const count=await Product.countDocuments({...keyword})

  const products = await Product.find({...keyword}).limit(pageSize).skip((page-1)*pageSize)
  res.json({products,page,pages:Math.ceil(count/pageSize)});
});

// GET /products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(" Product Not Found");
  }
});

// Delete /products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error(" Product Not Found");
  }
});

// Createproduct/POST /api/products/private,admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    description: "Sample description",
    numReviews: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Updateproduct/PUT /api/products/:id/private,admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    numReviews,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;
    product.numReviews = numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error(" Product Not Found");
  }
});

// Create new review/POST /api/products/:id/reviews,    private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if(alreadyReviewed){
      res.status(400);
      throw new Error("You have already reviewed this product");
    }
    const review={
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review);
    product.numReviews=product.reviews.length;
    product.rating=product.reviews.reduce((acc,curr)=>acc+curr.rating,0)/product.reviews.length;
    await product.save();
    res.status(201).json({message:"Review added successfully"});
  } else {
    res.status(404);
    throw new Error(" Product Not Found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview
};
