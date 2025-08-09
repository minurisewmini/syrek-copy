import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import { loginUser } from "./controller/userController.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import cors from "cors"

dotenv.config()


//entire backend 
//constant - do not change again
const app = express();


//Middleman
app.use(express.json())

app.use((req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer","").trim();
    console.log(token)

    if(token != null){
        jwt.verify(token,process.env.SECRET,(error,decoded)=>{
    if(!error){
        //console.log(decoded)
        req.user=decoded
        console.log(decoded)
    }else {
                console.log("Token verification failed:", error.message);
            }})
}

    next()

})



const connectionString = process.env.MONGO_DB_URL
app.use(cors())


mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected")
        app.listen(5000,()=>{

   console.log("Server is started")
   console.log("Thankyou")

    }
);
    }
).catch(
    (err)=>{
        console.log("Database connection failed",err);
    }
);

app.use("/api/users",userRouter)
app.post("/api/login",loginUser)
app.use("/api/products",productRouter)
app.use("/api/orders",orderRouter)

//function success(){
    //console.log("Server is started")
//}

    

// app.post("/",
//     (req,res)=>{
//         console.log("Post req received")
//     }
// )

app.delete("/",
    (req,res)=>{
        console.log("Delete request received")
    }
)
