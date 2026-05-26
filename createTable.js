import { dbConnection } from './dbConnection.js'

 function createUserTable(){
    const db =  dbConnection()
     db.exec(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`)
    
    console.log('Table users created')
}

 function createBookmarkTable() {
    const db =  dbConnection()

     db.exec(`CREATE TABLE IF NOT EXISTS bookmarks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT UNIQUE NOT NULL,
        url TEXT NOT NULL,
        tag TEXT NOT NULL,
        is_favorite INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
        )`)
        console.log('Table bookmarks created')
}

// createUserTable()

createBookmarkTable()
