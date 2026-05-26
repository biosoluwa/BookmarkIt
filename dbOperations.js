import { dbConnection } from "./dbConnection.js";

 function alterTable(){
    const db =  dbConnection()
     db.exec(`ALTER TABLE bookmarks
                    ADD  created_at DATETIME
        `)

         db.close()
    console.log('Column created_at added to bookmarks table')

}

 function deleteBookmarkTable() {
        const db = await dbConnection()

         db.run(`DELETE FROM bookmarks`)

         db.close()
        console.log('All rows deleted from bookmarks table')

}




 function deleteUsersTable() {
        const db = await dbConnection()

         db.run(`DELETE FROM users`)

         db.close()
        console.log('All rows deleted from users table')
}

 function updateCreatedAt(){
    const db = await dbConnection()

     db.run(`
        UPDATE bookmarks
        SET created_at = CURRENT_TIMESTAMP
        WHERE created_at IS NULL
    `)

     db.close()
    console.log('created_at updated')
}

 function dbTable() {
    const db =  dbConnection()
    db.exec('DROP TABLE bookmarks')
     db.close()

    console.log('table deleted successfully')

}

// dbTable()

// updateCreatedAt()

// alterTable()
// deleteBookmarkTable()
// deleteUsersTable()