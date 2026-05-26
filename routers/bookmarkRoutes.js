import express from 'express'
import { addBookmark, getBookmarks, filterBookmarks, deleteBookmark } from '../controllers/bookmarkController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const bookmarkRouter = express.Router()

bookmarkRouter.post('/add', requireAuth, addBookmark)

bookmarkRouter.get('/all', requireAuth, getBookmarks)

bookmarkRouter.get('/filter', requireAuth, filterBookmarks)

bookmarkRouter.delete('/:id', requireAuth, deleteBookmark)