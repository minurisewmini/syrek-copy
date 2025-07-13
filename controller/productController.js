import Product from "../models/product.js";


export function getproduct(req,res){
    Product.find().then(
        (productList)=>{
            res.status(200).json({
                list : productList
            })
        }

    ).catch((err)=>{
        res.json({
            message : "Error",err
        })
    });
}

export function createproduct(req,res){
    const product = new Product(req.user)

    if(req.user == null){
        res.json({
            message : "You are not logged in"
        })
        return
    }

    if(req.user.type !==  "admin"){
        res.json({
            message : "You are not an admin"
        })
        return
    }


    product.save().then(()=>{
        res.json(
        {
            message : "Product Created"
        })
    }
    ).catch(
        ()=>{
            res.json(
            {
                message : "Product not created"
            })
        }
    );
}

export function deleteaproduct(req,res){
        Product.deleteOne({name:req.body.name}).then(
            ()=>{
                res.json(
                    {
                        message : "Product deleted successfully"
                    }  
                )

        }).catch(
        ()=>{
            res.json(
                {
                    message:"Can't delete Product"
                }
            )
        }
    );

    }



    export function getProductbyName(req,res){
        const name= req.params.name;
        Product.find({name:name})
        .then((productList)=>{

            if(productList.length == 0){
                res.json({
                    message : "Product not found"
                })
            }else{
                res.json(
                    {
                        list : productList
                    }  
                )
            }

        }).catch(
        ()=>{
            res.json(
                {
                    message:"Error"
                }
            )
        }
    );

    }