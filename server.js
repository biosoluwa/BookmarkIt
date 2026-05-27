import express from 'express'
import { authRouter } from './routers/authRoutes.js'
import { meRouter } from './routers/meRouter.js'
import { bookmarkRouter } from './routers/bookmarkRoutes.js'
import './createTable.js'
import session  from 'express-session'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        secure:true,
        sameSite:'lax'
    }

}))

app.use(express.static('public'))

app.use('/api/auth/me', meRouter)

app.use('/api/auth', authRouter)

app.use('/api/bookmarks', bookmarkRouter)

app.use((req, res)=>{
    res.status(404).json({
        message:'Endpoint not found'
    })
})

app.listen(PORT, ()=> console.log(`Server listening on PORT ${PORT}`))