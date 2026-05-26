import { dbConnection } from "../dbConnection.js"

export async function meController(req, res){

    try{

    const db =  dbConnection()



    const user =  db.prepare(`SELECT email FROM users WHERE id = ?`).get(req.session.userId);

    res.json({
        isLoggedin: true,
        email: user.email
    })
}catch(err){
    res.status(500).json({error: 'Internal server error'})
}

}