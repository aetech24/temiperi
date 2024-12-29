import express from 'express';
<<<<<<< HEAD
const router = express.Router()
=======
const userRouter = express.Router()
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
import { loginUser, registerUser } from '../controllers/userController.js';

// router.put('/login', loginUser)
// router.post('/login', registerUser)

<<<<<<< HEAD
router.route('/login').post(registerUser)
router.route('/login').get(loginUser)



export default router
=======
userRouter.route('/login').post(registerUser)
userRouter.route('/login').get(loginUser)



export default userRouter
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
