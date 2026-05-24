
export function registerUser(req, res){
    let {firstName, lastName, signupEmail, signupPassword} = req.body
    console.log(firstName, lastName, signupEmail, signupPassword)
}