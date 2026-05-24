try{
    const res = await fetch('/api/auth/me')
    const data = await res.json()

    if(!res.ok){
        console.log(`Failed to fetch user's email: ${res.status}`)
    }else{
        console.log(data)
    }
}catch(err){
    console.error('Request error', err.message)
}