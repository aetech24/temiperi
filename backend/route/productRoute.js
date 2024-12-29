import express, { Router } from 'express'
const products = express.Router()
import { getAllProducts, addProduct, getProduct, deleteProduct, updateProduct } from '../controllers/productController.js'


products.route('/products').get(getAllProducts).post(addProduct)
products.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default products
