import { dbConnection } from "./dbConnection.js";

 function alterTable(){
    const db =  dbConnection()
     db.exec(`ALTER TABLE bookmarks
                    ADD  created_at DATETIME
        `)

    console.log('Column created_at added to bookmarks table')

}

 function deleteBookmarkTable() {
        const db =  dbConnection()

         db.prepare(`DELETE FROM bookmarks`).run()

        console.log('All rows deleted from bookmarks table')

}




 function deleteUsersTable() {
        const db =  dbConnection()

         db.prepare(`DELETE FROM users`).run()

        console.log('All rows deleted from users table')
}

 function updateCreatedAt(){
    const db =  dbConnection()

     db.prepare(`
        UPDATE bookmarks
        SET created_at = CURRENT_TIMESTAMP
        WHERE created_at IS NULL
    `).run()

    console.log('created_at updated')
}

 function dbTable() {
    const db =  dbConnection()
    db.exec('DROP TABLE bookmarks')

    console.log('table deleted successfully')

}

// dbTable()

// updateCreatedAt()

// alterTable()
// deleteBookmarkTable()
// deleteUsersTable()