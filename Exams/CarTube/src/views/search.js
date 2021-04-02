import { html } from '../../node_modules/lit-html/lit-html.js'
import { searchCar } from '../api/data.js';

const searchTemplate = (data)=> html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id = 'search' type="text" name="search" placeholder="Enter desired production year">
        <button id = 'searchBtn' class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        <!-- Display all records -->
        ${
          (data)
          ? html`${data.map(itemTemplate)}`
          
          : html`<p class="no-cars"> No results.</p>`
      } 

    </div>
</section>
`;

let itemTemplate = (item) => html`
<div class="listing">
            <div class="preview">
                <img src=${item.imageUrl}>
            </div>
            <h2>${item.brandModel}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${item.year}</h3>
                    <h3>Price: ${item.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${item._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
`;

export async function searchPage(ctx) {
    ctx.render(searchTemplate())

    const searchBtn = document.getElementById('searchBtn')
    const searchField = document.getElementById('search');
    searchBtn.addEventListener('click',async function(){

        const query = searchField.value;
        const data = await searchCar(query)
        data.forEach(element => {
            element.brandModel = `${element.brand} ${element.model}`;   
        });
        ctx.render(searchTemplate(data));
    })

}
