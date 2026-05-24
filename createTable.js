import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'
import { dbConnection } from './dbConnection.js'

async function createTable(){
    const db = await dbConnection()
    await db.exec(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`)
    
    await db.close()
    console.log('Table users created')
}

createTable()
