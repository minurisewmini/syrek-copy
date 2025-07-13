import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import { loginUser } from "./controller/userController.js";
import jwt from "jsonwebtoken";


//entire backend 
//constant - do not change again
const app = express();


//Middleman
app.use(express.json())

app.use((req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer","").trim();
    console.log(token)

    if(token != null){
        jwt.verify(token,"minuri@123",(error,decoded)=>{
    if(!error){
        //console.log(decoded)
        req.user=decoded
    }else {
                console.log("Token verification failed:", error.message);
            }})
}

    next()

})



const connectionString = "mongodb+srv://admin:123@cluster0.wj40qep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


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

app.use('/api/students',studentRouter)
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)
app.use("/api/login",loginUser)

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

export default studentRouter;
