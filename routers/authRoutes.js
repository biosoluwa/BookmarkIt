import express from 'express'
import { registerUser } from '../controllers/authControllers.js'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)