import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyPets } from '../api/data.js'


const myProfileTemplate = (data) => html`

    <section id="my-pets-page" class="my-pets">
        <h1>My Pets</h1>
        <!-- Display ul: with list-items for every user's pet (if any) -->
        <ul class="my-pets-list">

        ${(data.length === 0)? html`<p class="no-pets">No pets in database!</p>`
        :
        html`${data.map(itemTemplate)}`
        }

            <!-- <li class="otherPet">
                <h3>Name: Tom</h3>
                <p>Type: cat</p>
                <p class="img"><img src="/images/cat1.png"></p>
                <a class="button" href="#">Details</a>
            </li> -->
        </ul>

        <!-- Display paragraph: If the user doesn't have his own pets  -->
        
    </section>
`;

const itemTemplate = (item) => html`
<li class="otherPet">
    <h3>Name: ${item.name}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href="/details/${item._id}">Details</a>
</li>
`;


export async function myProfilePage(ctx) {
    const userId = sessionStorage.getItem('userId');
    console.log(userId);

    const data = await getMyPets(userId)
    ctx.render(myProfileTemplate(data));
}