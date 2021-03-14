import * as element from './elements.js'

export function register() {
    
    let sessionStorage = window.sessionStorage;

    element.submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const formData = new FormData(element.registerFormular);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('repeatPassword')

       
        if(email===''||password.length<6){
            element.registerFormular.reset();
            window.alert('Email Field must be filled and Password Field should be at least 6 characters')
        }
        if(password!==rePass){
            window.alert('password do not match')
        }

        let data = {
            email,
            password
        }
        
        fetch(`http://localhost:3030/users/register`, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            sessionStorage.setItem('authKey', data.accessToken);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('id',data._id);
            element.formRegister.style.display = 'none';
            element.homePage.style.display = 'block';
            element.login.style.display = 'none';
            element.logout.style.display = 'block';
            element.register.style.display = 'none'
            element.welcomeEmail.style.display = 'block';
            element.welcomeEmail.textContent = `Welcome, ${sessionStorage.email}`;
            
        })
       
        
            

    })
}