import express from 'express'
import { addBookmark, getBookmarks } from '../controllers/bookmarkController.js'
import { requireAuth } from '../middleware/requireAuth.js'


export const bookmarkRouter = express.Router()

bookmarkRouter.post('/add', requireAuth, addBookmark)

bookmarkRouter.get('/all', requireAuth, getBookmarks)