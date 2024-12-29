import express, { Router } from 'express'
<<<<<<< HEAD
const products = express.Router()
import { getAllProducts, addProduct, getProduct, deleteProduct, updateProduct } from '../controllers/productController.js'


products.route('/products').get(getAllProducts).post(addProduct)
products.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default products
=======
const productsRouter = express.Router()
import { getAllProducts, addProdut, getProduct, deleteProduct, updateProduct } from '../controllers/productController.js'


productsRouter.route('/products').get(getAllProducts).post(addProdut)
productsRouter.route('/products/:name').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default productsRouter
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
