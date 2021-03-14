import {register} from './register.js'
import * as element from './elements.js'
import {login} from './login.js'

const url = 'http://localhost:3030/';




element.moviesContainer.addEventListener('click',function(e){
    e.preventDefault();
    if(e.target.textContent === 'Register'){
        element.homePage.style.display = 'none';
        element.formRegister.style.display = 'block';
    }else if (e.target.textContent === 'Login'){
        element.homePage.style.display = 'none';
        element.formLogin.style.display = 'block';
        

    }
})
register();
login();



