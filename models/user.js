import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,//need to be write something in it(can't empty)
        unique : true //for one person can have one email
    },

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    isBlocked : {
        type : Boolean,
        default : false,
    },

    type : {
        type : String,
        default : "customer",
    },

    profilePic : {
        type : String,
        default : "https://www.freepik.com/free-vector/user-circles-set_145856997.htm#fromView=keyword&page=1&position=2&uuid=e2ca6431-3e26-400a-a0d4-707f5eabbdc2&query=User",
    }

})

//define the model
const User = mongoose.model("users",userSchema)

export default User