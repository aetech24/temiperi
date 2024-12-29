<<<<<<< HEAD
// import 'dotenv/config'
// import Product from './models/productModel.js'
// import productData from './products.json' assert {type: 'json'}
// import { connectDB } from './config/db.js'

// const start = async () => {
//    try {
//       await connectDB()
//       await Product.deleteMany()
//       await Product.create(productData)
//       console.log('Products created');
//       process.exit(0)
//    } catch (error) {
//       console.log(error);
//       process.exit(1)
//    }
// }

// start()
=======
import 'dotenv/config'
import Product from './models/productModel.js'
import productData from './products.json' assert {type: 'json'}
import { connectDB } from './config/db.js'

const start = async () => {
   try {
      await connectDB()
      await Product.deleteMany()
      await Product.create(productData)
      console.log('Products created');
      process.exit(0)
   } catch (error) {
      console.log(error);
      process.exit(1)
   }
}

start()
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
