import { logout } from "./logout.js"
import { returnEmail } from "./returnEmail.js"

const mail = await returnEmail()
const mailP = document.getElementById('user-mail')
mailP.innerHTML = mail



async function getBookmarks() {
    try{
        const res = await fetch('/api/bookmarks/all')
        if(!res.ok){
            console.warn('Unexpected response', res.status)
            return false
        }
        const data = await res.json()
        console.log(data)
    }catch(err){
        console.log(err)
    }
    
}

document.getElementById('log-out').addEventListener('click', logout)