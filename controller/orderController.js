import Order from "../models/order.js";
import Product from "../models/product.js";
import { isCustomer } from "./userController.js";

export async function createOrder (req,res){
    //cbc001

    if(!isCustomer(req)){
        res.json({
            message :"Please login as a customer to create orders"
        })
    }

    //take the latest productId

    try{
        const latestOrder = await Order.find().sort({date : -1}).limit(1)

        let orderId 

        if (latestOrder.length == 0){
            orderId = "CBC0001"
        }else{
            const currentOrderId = latestOrder[0].orderId

            const numberString = currentOrderId.replace("CBC","")
            const number = parseInt (numberString)
            const newNumber = (number +1).toString().padStart(4,"0");  
            
            orderId = "CBC" + newNumber
        }

        const newOrderData =req.body

        const newProductArray = []

        // for (let i=0;i<newOrderData.orderItems.length;i++){
        //     console.log(newOrderData.orderItems[i])
        // }
    for (let i=0;i<newOrderData.orderItems.length;i++){


        const product = await Product.findOne({
            productId : newOrderData.orderItems[i].productId
        })

        if (product == null){
            res.json({
                message : "Product with ID "+newOrderData.orderItems[i].productId+" not found"
            })
            return
        }

        newProductArray[i]={
            productId : product.productId,
            name : product.productName,
            price : product.price,
            quantity : newOrderData.orderItems[i].quantity,
            image : product.images[0]
        }
        

    }

        console.log(newProductArray)
        newOrderData.orderItems = newProductArray


        console.log("Received orderItems:", newOrderData.orderItems);



        newOrderData.orderId = orderId
        newOrderData.email = req.user.email

        const order =new Order(newOrderData)
        await order.save()

        res.json({
            message : "Order Created"
        })


    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

export async function getOrders(req,res) {
    try{
        const orders = await Order.find({
            email : req.user.email
        })
        res.json(orders)
    }catch(error){
        res.status(500).json
({
    message : error.message
})    
}
}