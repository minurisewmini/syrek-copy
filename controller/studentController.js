import Student from "../models/student.js";

//when get req
export function getStudent(req,res){
        console.log(req.body)

         // console.log("Get req received")
        
                // let prefix = "Mr."
                // if(req.body.gender =="Female"){
                //     prefix = "Mrs."
                // }
        
                // res.json(
                //     {
                //         message:"Hello "+prefix+" "+req.body.name
                //     }
                // )
        
        //read and get all the student information from the mongo DB
        Student.find().then(
            (student)=>{
                res.json(
                    student
                )
            }
        ).catch(
            ()=>{
                
            }
        );

    }


    //when post req
    export function createStudent(req,res){
        //print in terminal
        //console.log(req.body)

        const student = new Student (
        {
            name:req.body.name,
            age:req.body.age,
            city:req.body.city  
        }
    )

    student.save().then(
        ()=>{
            res.json(
                
                {
                    message:"Student Created Successfully"
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message:"Failed to create student"
                }
            )
        }
    );

    }


    export function deleteStudent(req,res){
        Student.deleteOne({name:req.body.name}).then(
            ()=>{
                res.json(
                    {
                        message : "Student deleted successfully"
                    }  
                )

        }).catch(
        ()=>{
            res.json(
                {
                    message:"Can't delete student"
                }
            )
        }
    );

    }
