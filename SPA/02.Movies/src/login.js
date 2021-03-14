import * as element from './elements.js'

export function login() {

    element.loginButton.addEventListener('click', function (e) {
        e.preventDefault();
        let formData = new FormData(element.loginFormular);
        let email = formData.get('email');
        let password = formData.get('password');

        if (email === '' || password.length < 6) {
            element.registerFormular.reset();
            window.alert('Email Field must be filled and Password Field should be at least 6 characters')
        }

        let data = {
            email,
            password
        };

        fetch(`http://localhost:3030/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem('authKey', data.accessToken);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('id', data._id);
                element.formRegister.style.display = 'none';
                element.homePage.style.display = 'block';
                element.login.style.display = 'none';
                element.logout.style.display = 'block';
                element.register.style.display = 'none'
                element.welcomeEmail.style.display = 'block';
                element.welcomeEmail.textContent = `Welcome, ${sessionStorage.email}`;
                element.formLogin.style.display = 'none';

            })

    })
}