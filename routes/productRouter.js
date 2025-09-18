import express, { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProduct)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)
productRouter.get("/:productId",getProductById)

export default productRouter;
