import express, { Router } from 'express'
const products = express.Router()
import { getAllProducts, addProdut, getProduct, deleteProduct, updateProduct } from '../controllers/productController.js'


products.route('/products').get(getAllProducts).post(addProdut)
products.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default products
