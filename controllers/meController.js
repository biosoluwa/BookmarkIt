import { dbConnection } from "../dbConnection.js"

export async function meController(req, res){

    try{

    const db = await dbConnection()

    // if(!req.session.userId){
    //     return res.json({
    //         isLoggedin: false
    //     })
    // }


    const user = await db.get(`SELECT email FROM users WHERE id = ?`,
        [req.session.userId]
    );

    res.json({
        isLoggedin: true,
        email: user.email
    })
}catch(err){
    res.status(500).json({error: 'Internal server error'})
}

}