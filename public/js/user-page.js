import { logout } from "./logout.js"

try{
    const res = await fetch('/api/auth/me')
    const data = await res.json()

    if(!res.ok){
        console.log(`Failed to fetch user's email: ${res.status}`)
    }

 
    displayUserMail(data.email)
    
    }catch(err){
        console.error('Request error', err.message)
}

function displayUserMail(mail){
    const mailP = document.getElementById('user-mail')
    mailP.innerHTML = mail
}


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