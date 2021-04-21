import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyCars } from '../api/data.js'

// ${
//     (data.length!==0)
//     ? html`${data.map(itemTemplate)}`   
//     : html`<p class="no-cars"> You haven't listed any cars yet.</p>`
// }   

const myListingsTemplate = (data) => html`

`;

let itemTemplate = (item) => html`

`;

export async function myListingsPage(ctx) {
    const userId = sessionStorage.getItem('userId');

    const data = await getMyCars(userId)
    ctx.render(myListingsTemplate(data));

}