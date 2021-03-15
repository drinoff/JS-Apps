import {catCard} from './catCard.js'
import {render} from 'https://unpkg.com/lit-html?module';
import {cats} from './catSeeder.js';


const sectionElement = document.getElementById('allCats');
const ulEl = document.createElement('ul');

let catsToRender = cats.map(x=>catCard(x));
console.log(catsToRender);
render(catsToRender,ulEl);
sectionElement.appendChild(ulEl);
