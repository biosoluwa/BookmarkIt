import express from 'express'
import { addBookmark } from '../controllers/bookmarkController.js'
export const bookmarkRouter = express.Router()

bookmarkRouter.post('/add', addBookmark)