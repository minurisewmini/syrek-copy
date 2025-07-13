import mongoose from "mongoose"

const studentSchema = new mongoose.Schema(
    {
    name:String,
    age:Number,
    city:String
    }
)

//define the model
const Student = mongoose.model("Student",studentSchema)

export default Student