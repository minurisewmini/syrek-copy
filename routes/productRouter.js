import express from "express";
import { createproduct, deleteaproduct, getproduct, getProductbyName } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/",getproduct);
productRouter.get("/:name",getProductbyName)

productRouter.post("/",createproduct);

productRouter.delete("/",deleteaproduct);

export default productRouter;
