import Order from "../models/orderModel.js";

const addOrder = async (req, res) => {
<<<<<<< HEAD
  const order = await Order.create(req.body);
  await order.save();
  res.status(201).json({ success: "new order add successfully", data: order });
};

// fetching all order list
const orderList = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: 1 });
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders Available" });
    }
    return res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "error" });
  }
};

//fetching an order
const singleOrder = async (req, res) => {
  try {
    const { id: orderID } = req.params;
    const order = await Order.findOne({ _id: orderID });

    if (!order) {
      return res.status(404).json({ message: "No order found. Thank You" });
    }

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { addOrder, orderList, singleOrder };
=======
   const order = await Order.create(req.body)
   await order.save()
   res.status(201).json({success: 'new order add successfully', data: order})

}

// fetching all order list 
const orderList = async (req, res) => {
   try{
      const search = 'a'
      const orders = await Order.find({
        name: { $regex: search, $options: "i" },
        quantity: { $gt: 10 },
      }).sort("name price");
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

      const { name, sort, numericFilters } = req.query;
      const queryObject = {};

      if (name) {
        queryObject.name = { $regex: name, $options: "i" };
      }

      if (numericFilters) {
        const operatorMap = {
          ">": "$gt",
          ">=": "$gte",
          "=": "$eq",
          "<": "$lt",
          "<=": "$lte",
        };
        const regEx = /\b(<|>|<=|=|>=)\b/g;
        let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );

        // const options = ['quantity'];
        // filters = filters.forEach((item) => {
        //    const [operator, value] = item
        //    if(options.value)
        // })
      }

      console.log(queryObject)
      let result = Invoice.find(queryObject)
      // sort
      if(sort) {
         const sortList = sort.split(',').join('')
         result = result.sort(sortList)
      } else {
         result = result.sort('createdAt')
      }

      if(!order){
         return res.status(404).json({message: 'No order found. Thank You'})
      }

      res.status(201).json({order})
   } catch (error) {
      res.status(500).json({message: error})
   }
}

export { addOrder, orderList, singleOrder}
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
