import { dbConnection } from "./dbConnection.js";

async function alterTable(){
    const db = await dbConnection()
    await db.exec(`ALTER TABLE bookmarks
                    ADD  created_at DATETIME
        `)

        await db.close()
    console.log('Column created_at added to bookmarks table')

}

async function deleteBookmarkTable() {
        const db = await dbConnection()

        await db.run(`DELETE FROM bookmarks`)

        await db.close()
        console.log('All rows deleted from bookmarks table')

}




async function deleteUsersTable() {
        const db = await dbConnection()

        await db.run(`DELETE FROM users`)

        await db.close()
        console.log('All rows deleted from users table')
}

// alterTable()
// deleteBookmarkTable()
// deleteUsersTable()