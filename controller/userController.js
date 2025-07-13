import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function createUser(req,res){
    const newUserData = req.body
    newUserData.password = bcrypt.hashSync(newUserData.password,10)

        console.log(newUserData)

    const user = new User(newUserData);

    user.save().then(()=>{
        res.json({
            message : "User Created"
        })
    }).catch((err)=>{
        res.json({
            message : "User not created",err
        })
    });
 }

 export function loginUser(req,res){
    User.find({email : req.body.email}).then((users)=>{
        if(users.lenght == 0){
            message : "User not found"
        }else{
            const user = users[0]

            const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

            if(isPasswordCorrect){
               const token = jwt.sign({
                email : user.email,
                firstName : user.firstName,
                lastName : user.lastName,
                isBlocked : user.isBlocked,
                type : user.type,
                profilePicture : user.profilePicture
            },"minuri@123")

                res.json({
                    message : "User logged in",
                    token : token
                })   
        }else{
                res.json({
                    message : "Password is Incorrect Can't login to the system"
                })
        }
    }
 })
 }