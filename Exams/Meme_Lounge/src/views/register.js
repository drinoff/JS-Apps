import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js'

const registerTemplate = (onSubmit) => html`
<section @submit=${onSubmit} id="register">
    <form id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="#">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))
    console.log(ctx)
    async function onSubmit(e) {
        e.preventDefault();
        const createForm = document.getElementById('register-form');
        let formData = new FormData(createForm);

        let username = formData.get('username');
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('repeatPass');
        let gender = formData.get('gender');
        if (username === '' || email === '' || password === '' || repeatPass === '') {
            window.alert(`all fields must be filled`)
        } else {
            await register(email, password, rePass, gender)
            ctx.setUserNav();
            ctx.page.redirect('/catalog');
        }
    }

}