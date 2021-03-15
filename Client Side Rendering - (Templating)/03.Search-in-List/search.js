import { html,render } from 'https://unpkg.com/lit-html?module';
import {towns} from './towns.js';

function search() {
   const searchBtn = document.getElementsByTagName('button')[0];
   let searchText = document.getElementById('searchText');
   const divEl = document.getElementById('towns');
   const ulEl = document.createElement('ul');
   
   let townsToRender = templateData(towns,'');
   
   render(townsToRender,ulEl);
   divEl.appendChild(ulEl);
   
   searchBtn.addEventListener('click',function(){
      let toRender = templateData(towns,'active')
      render(toRender,ulEl)

   })

   function templateData(towns,statusClass){
      let townsToRender = towns.map(t=>html`        
         ${
            t.includes(searchText.value) ? html`<li class = ${statusClass}>${t}</li>`
                                         : html`<li>${t}</li>`
         }`)
      return townsToRender;

   }
}
search();
