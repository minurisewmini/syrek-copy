import express from "express"
import { createStudent, deleteStudent, getStudent } from "../controller/studentController.js";


const studentRouter = express.Router();

studentRouter.get("/", getStudent);

studentRouter.post("/",createStudent);

//create
studentRouter.put("/",
    ()=>{
        console.log("Put req into studentRouter")
    }
);

studentRouter.delete("/",deleteStudent);

export default studentRouter;