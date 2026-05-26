import Database from 'better-sqlite3'

const db = new Database('database.db')

export function dbConnection() {
    return db
}