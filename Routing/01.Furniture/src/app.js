import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'

import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { editPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { myFurniturePage } from './views/myFurniture.js';
import * as api from './api/data.js';


window.api = api;

const main = document.querySelector('.container');

page('/', decorateContext, dashboardPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/details/:id', decorateContext, detailsPage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/my-furniture', decorateContext, myFurniturePage);

setUserNav()

page();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}


function setUserNav() {
    const user = sessionStorage.getItem('userId');
    if (user != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

document.getElementById('logoutBtn').addEventListener('click',async ()=>{
    await api.logout();
    setUserNav();
    page.redirect('/');
})