import validator from 'validator'
import {dbConnection} from '../dbConnection.js'
import bcrypt from 'bcryptjs'
import { error } from 'node:console'

export async function registerUser(req, res){
    let {firstName, lastName, signupEmail, signupPassword} = req.body
    if(!firstName || !lastName || !signupEmail || !signupPassword){
        return res.status(400).json({message: 'All fields required'})
    }

    firstName = firstName.trim()
    lastName = lastName.trim()
    signupEmail = signupEmail.trim()

    if(!validator.isEmail(signupEmail)){
        return res.status(400).json({message: 'Invalid Email Format'})
    }
    
    try{

        const db = await dbConnection()
        const existing = await db.get(`SELECT id FROM users WHERE email=?`,
            [signupEmail]
        )
        if(existing){
            return res.status(400).json({message: 'Email already exists!'})
        }
        
        signupPassword = await bcrypt.hash(signupPassword, 10)

        const newUser = await db.run(`INSERT INTO users(first_name, last_name, email, password)VALUES(?,?,?,?)`,
            [firstName, lastName, signupEmail, signupPassword]
        )
        req.session.userId = newUser.lastID
        res.status(201).json({message: 'user registered'})

    }catch(err){
        console.error('Registration error', err.message);
        res.status(500).json({error: 'Registration failed. Please try again.'})
    }
}


export async function loginUser(req,res) {
    let {email, password} = req.body

    if(!email || !password){
        return res.status(401).json({error: 'All fields are required'})
    }

    email = email.trim()

    if(!validator.isEmail(email)){
        return res.status(401).json({error: 'Invalid email address'})
    }

    try{
        const db = await dbConnection()
        const existing = await db.get(`SELECT * FROM users WHERE email=?`, [email]);
        
        if(!existing){
            return res.status(401).json({error: 'Invalid credentials'})
        }

        const isValid = await bcrypt.compare(password, existing.password)

        if(!isValid){
            return res.status(401).json({error: "Invalid Credentials"})
        }

        req.session.userId = existing.id
        res.json({message: 'Logged In'})
    }catch(err){
        console.error('Login error:', err.message)
        res.status(500).json({ error: 'Login failed. Please try again.' })
    }
}

export async function logoutUser(req, res){
    req.session.destroy(()=>{
        res.json({message: 'Logged out'})
    })
}