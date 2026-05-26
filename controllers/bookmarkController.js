import validator from 'validator'
import { dbConnection } from '../dbConnection.js'
import { error } from 'node:console'


export async function addBookmark(req,res) {
    let {title, url, tag, favoriteStatus} = req.body
    let status = 0
    if(!title || !url || !tag){
        return res.status(400).json({error: 'All fields required'})
    }

    if(favoriteStatus){
        status = 1
    }else{
        status = 0
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
        await db.run(`INSERT INTO bookmarks(user_id, title, url, tag, is_favorite)VALUES(?, ?,?,?,?)`, [req.session.userId, title, url, tag, status])
        res.status(201).json({message: "New bookmark added"})
    }catch(err){
        res.status(500).json({error: "Internal server error"})
        console.log(err)
    }
}


export async function getBookmarks(req,res) {
    try{
        const db = await dbConnection()
        const result = await db.all(`SELECT * FROM bookmarks WHERE user_id =?`, [req.session.userId])
        res.json(result)
    }catch(err){
        res.status(500).json({error: "Internal server error"})
    }
}

export async function filterBookmarks(req,res) {
    let {is_favorite, tag, search} = req.query

    try{
        const db = await dbConnection()
        let query = `SELECT * FROM bookmarks WHERE user_id = ?`
        let param = [req.session.userId]
        if(is_favorite){
            query += ` AND is_favorite=?`
            param.push(is_favorite)
        }else if(tag){
            query += ` AND tag=?`
            param.push(tag)
        }else if(search){
            query += ` AND (tag LIKE? OR title LIKE?)`
            const searchPattern = `%${search}%`
            param.push(searchPattern, searchPattern)
        }

        const filteredBookmarks = await db.all(query, param)
        res.json(filteredBookmarks)
    }catch(err){
        res.status(500).json({error: 'Internal server error'})
    }
}

export async function deleteBookmark(req, res){
    try{
        const db = await dbConnection()

        const cardId = parseInt(req.params.id)
        if(isNaN(cardId)){
            return res.status(400).json({error: 'Invalid Item ID'})
        }

        await db.run(`DELETE FROM bookmarks WHERE id = ? and user_id =?`, [cardId, req.session.userId])
        res.status(204).send()
    }catch(err){
        res.status(500).json({error: 'Internal server error'})
    }
}