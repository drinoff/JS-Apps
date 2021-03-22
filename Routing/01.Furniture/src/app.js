import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js'

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

page('/', renderMiddleware, dashboardPage);
page('/create', renderMiddleware, createPage);
page('/edit/:id', renderMiddleware, editPage);
page('/details/:id', renderMiddleware, detailsPage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);
page('/my-furniture', renderMiddleware, myFurniturePage);

page();

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    next();
}