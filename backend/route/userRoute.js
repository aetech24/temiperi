import express from 'express';
const userRouter = express.Router()
import { loginUser, registerUser } from '../controllers/userController.js';

// router.put('/login', loginUser)
// router.post('/login', registerUser)

userRouter.route('/login').post(registerUser)
userRouter.route('/login').get(loginUser)



export default userRouter