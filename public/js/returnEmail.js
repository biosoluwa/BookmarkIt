export async function returnEmail() {
    
    try{
        const res = await fetch('/api/auth/me', {
            credentials: 'include'
        })
        const data = await res.json()

        if(!res.ok){
            window.location.href = '/'
            console.log(`Failed to fetch user's email: ${res.status}`)
        }

    
        return data.email
        
        }catch(err){
            console.error('Request error', err.message)
    }

}