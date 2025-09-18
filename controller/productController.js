import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

// function isAdmin(req){
//     return req.user && req.user.role === "admin";
// }
export function createProduct(req,res){

    if (!isAdmin(req)){
        res.json({
            message : "Please login as a administrator to add products"
        })
        return
    }
    const newProductDate = req.body

    const product = new Product(newProductDate)

    product.save().then(()=>{
        res.json({
            message : "Product is created"
        })
    }).catch((error)=>{
        res.status(403).json({
            message : error
        })
    })
}

export function getProduct(req,res){
    Product.find({}).then((product)=>{
        res.json(product)
    })
}


export function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message:("Please login as adminstrator to delete a product")

        })
        return
    }
    const productId = req.params.productId;

    Product.deleteOne(
        {productId : productId}
    ).then(()=>{
        res.json({
            message:"Product deleted"
        })
    }).catch((error)=>{
        res.status(403).json({
            message:error
        })
    })
}

export function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message:("Please login as adminstrator to update a product")

        })
        return
    }
    const productId = req.params.productId
    const newProductData = req.body

    Product.updateOne(
        {productId : productId},
        newProductData
    ).then(()=>{
        res.json({
            message:"Product Updated"
        })
    }).catch((error)=>{
        res.status(403).json({
            message:error
        })

    })
}

export async function getProductById(req,res){
    try{
        const productId = req.params.productId

        const product = await Product.findOne({productId:productId})

        res.json(product)
    }catch(e){
        res.status(500).json({
            e
        })
    }
}
