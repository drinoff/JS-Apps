import { html } from '../../node_modules/lit-html/lit-html.js'
import { getItemById } from '../api/data.js';

const itemDetailsTemplate = (data) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${`.${data.img}`} />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>${data.price}</span></p>
                <p>Material: <span>${data.material}</span></p>
                <div>
                    ${(data._ownerId === sessionStorage.userId)
        ?
        html`<a href='/edit/${data._id}' class='btn btn-info'>Edit</a>
                    <a href='/' class="btn btn-red">Delete</a>`
        : ''
    }
                </div>
            </div>
        </div>
    </div>
`


export async function detailsPage(ctx) {
    const data = await getItemById(ctx.params.id);
    ctx.render(itemDetailsTemplate(data));
    
}




