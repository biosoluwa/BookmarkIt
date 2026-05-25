const signupForm = document.getElementById('signup-form')
const loginForm = document.getElementById('login-form')
const agreeCheckbox = document.getElementById('agree')
const signupPassword = document.getElementById('signup-password')
const confirmPassword = document.getElementById('confirm-password')

document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('tab')){
      const tabs = document.getElementsByClassName('tab')
      const tab = Array.from(tabs).forEach(function(tab){
            if(tab.classList.contains('on')){
                tab.classList.remove('on')
                signupForm.style.display = 'none'
                loginForm.style.display = 'none'
            }
      })


      if(e.target.textContent === 'Log in'){
        e.target.classList.add('on')
        loginForm.style.display = 'flex'
      }else if(e.target.textContent === 'Register'){
        e.target.classList.add('on')
        signupForm.style.display = 'flex'
      }
      
    }

    if(e.target.id === 'create-free'){
        loginForm.style.display = 'none'
        document.getElementById('tab-on').classList.remove('on')
        document.getElementById('register').classList.add('on')
        signupForm.style.display = 'flex'
    }

    if(e.target.id === 'a-login'){
        signupForm.style.display = 'none'
        document.getElementById('register').classList.remove('on')
        document.getElementById('tab-on').classList.add('on')
        loginForm.style.display = 'flex'

    }
})


confirmPassword.addEventListener('input', checkPasswords)

function checkPasswords(){
    if(signupPassword.value !== confirmPassword.value){
        confirmPassword.setCustomValidity('Passwords do not match')
    }else{
        confirmPassword.setCustomValidity('')
    }
}


 signupForm.addEventListener('submit', async (e)=>{
     e.preventDefault()

    const signupFormData = new FormData(signupForm)
    const firstName = signupFormData.get('first-name')
    const lastName = signupFormData.get('last-name')
    const signupEmail = signupFormData.get('signup-email')
    const signupPassword = signupFormData.get('signup-password')

    console.log(firstName, lastName, signupPassword)

    await sendData(firstName, lastName, signupEmail, signupPassword)

    signupForm.reset()
})


async function sendData(firstName, lastName, signupEmail, signupPassword){
    try{
        const res = await fetch('/api/auth/register', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                signupEmail: signupEmail,
                signupPassword: signupPassword
            })
        })
        const data = await res.json()

        if(res.ok){
            window.location.replace('user-page.html')
            console.log('Account created')
        }else{
            console.log('Failed to create account')
        }
    }catch(err){
        console.error('Network error:', err)
    }
}


loginForm.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const loginFormData = new FormData(loginForm)
    const email = loginFormData.get('email')
    const password = loginFormData.get('password')

    const loginDetails = {
        email: email,
        password: password
    }

    await sendLoginDetails(loginDetails)
    loginForm.reset()
})

async function sendLoginDetails(loginDetails){
    try{
        const res = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include', 
            body: JSON.stringify(loginDetails)
        })

        if(res.ok){
            window.location.href = 'user-page.html'
        }else{
            console.log('Login failed. Please try again')
        }
    }catch(err){
        console.error('Network error:', err)
    }
}