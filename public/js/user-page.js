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