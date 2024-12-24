import express, { Router } from 'express'
const productsRouter = express.Router()
import { getAllProducts, addProdut, getProduct, deleteProduct, updateProduct } from '../controllers/productController.js'


productsRouter.route('/products').get(getAllProducts).post(addProdut)
productsRouter.route('/products/:name').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default productsRouter
