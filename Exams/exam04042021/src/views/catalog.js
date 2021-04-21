import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllArticles } from '../api/data.js';



const catalogTemplate = (data) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
    ${(data.length!=0)
        ?html`${data.map(itemTemplate)}`
        :html`<h3 class="no-articles">No articles yet</h3>`

    }
    
</section>
`;

let itemTemplate = (item) => html`

 <a class="article-preview" href="/details/${item._id}">
    <article>
        <h3>Topic: <span >${item.title}</span></h3>
        <p>Category: <span >${item.category}</span></p>
    </article>
</a>   

`;

export async function catalogPage(ctx) {
    
    const data = await getAllArticles();
    console.log(ctx)
    ctx.render(catalogTemplate(data));

    
}