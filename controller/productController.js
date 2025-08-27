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
