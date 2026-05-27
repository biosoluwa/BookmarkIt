export async function logout() {
    try{
        const res = await fetch('/api/auth/logout', {
            credentials: 'include'
        })
        window.location.href = '/'
    }catch(err){
        console.log('failed to logout', err)
    }
}