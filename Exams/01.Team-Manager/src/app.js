import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'


import * as api from './api/data.js';

import {homePage} from '../src/views/homePage.js'
import {createTeamPage} from '../src/views/createTeamPage.js'
import {editPage} from '../src/views/editPage.js'
import {loginPage} from '../src/views/loginPage.js'
import {registerPage} from '../src/views/registerPage.js'
import {myTeamsPage} from '../src/views/myTeamsPage.js'
import {detailsPage} from '../src/views/detailsPage.js'


window.api = api;

const main = document.getElementById('main');

page('/',decorateContext,homePage);
page('/create',decorateContext,createTeamPage);
page('/edit/:id',decorateContext,editPage);
page('/details/:id',decorateContext,detailsPage);
page('/login',decorateContext,loginPage);
page('/register',decorateContext,registerPage);
page('/my-teams',decorateContext,myTeamsPage);

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
        document.getElementById('logout').style.display = 'inline-block';
        document.getElementById('myTeams').style.display = 'inline-block';
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'none';
    } else {
        document.getElementById('logout').style.display = 'none';
        document.getElementById('myTeams').style.display = 'none';
        document.getElementById('register').style.display = 'inline-block';
        document.getElementById('login').style.display = 'inline-block';
    }
}

// document.getElementById('logoutBtn').addEventListener('click',async ()=>{
//     await api.logout();
//     //setUserNav();
//     page.redirect('/');
// })