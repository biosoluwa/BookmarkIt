import express from 'express'
import { meController } from '../controllers/meController.js'

export const meRouter = express.Router()

meRouter.get('/', meController)