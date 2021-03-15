import {html, render} from 'https://unpkg.com/lit-html?module';

const inputTownsElement = document.getElementById('towns');
const loadBtn = document.getElementById('btnLoadTowns');
const rootEl = document.getElementById('root');
const ulEl = document.createElement('ul');
rootEl.appendChild(ulEl);

loadBtn.addEventListener('click', function(){
    let towns = inputTownsElement.value.split(', ');
    let townsToReender = towns.map(x=>html`<li>${x}</li>`);
    render(townsToReender,ulEl) 
});

