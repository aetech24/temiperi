import Order from "../models/orderModel.js";

const addOrder = async (req, res) => {
   const order = await Order.create(req.body)
   await order.save()
   res.status(201).json({success: 'new order add successfully', data: order})

}

// fetching all order list 
const orderList = async (req, res) => {
   try{
      const orders = await Order.find({});
      return res.json({success: true, data: orders})
   } catch(error) {
      console.log(error)
      return res.json({success: false, message: 'error'})
   }
}


//fetching an order 
const singleOrder = async (req, res) => {
   try {
      const {id: orderID} = req.params
      const order = await Order.findOne({_id:orderID})

      if(!order){
         return res.status(404).json({message: 'No order found. Thank You'})
      }

      res.status(201).json({order})
   } catch (error) {
      res.status(500).json({message: error})
   }
}

export { addOrder, orderList, singleOrder}