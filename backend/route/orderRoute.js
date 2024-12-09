import express from 'express'
const orderRouter = express.Router();
import { addOrder, orderList, singleOrder } from '../controllers/orderController.js'


orderRouter.route('/order').post(addOrder);
orderRouter.route('/orders').get(orderList)
orderRouter.route('/orders/:id').get(singleOrder)


export default orderRouter