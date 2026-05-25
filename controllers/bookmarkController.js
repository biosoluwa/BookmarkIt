import validator from 'validator'
import { dbConnection } from '../dbConnection.js'


export async function addBookmark(req,res) {
    let {title, url, tag, favoriteStatus} = req.body

    if(!title || !url || !tag || !favoriteStatus){
        return res.status(400).json({error: 'All fields required'})
    }

    if(!validator.isURL(url)){
        return res.status(400).json({error: "Invalid URL"})
    }
    try{
        const db = await dbConnection()
        const existing = await db.get(`SELECT id FROM bookmarks WHERE url =?`, [url])

        if(existing){
            return res.status(400).json({error: 'Url already exixts'})
        }
        await db.run(`INSERT INTO bookmarks(title, url, tag, is_favorite)VALUES(?,?,?,?)`, [title, url, tag, favoriteStatus])
        res.status(201).json({message: "New bookmark added"})
    }catch(err){
        res.status(500).json({error: "Internal server error"})
        console.log(err)
    }
}