import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getPetById } from '../api/data.js';
import {editPet} from '../api/data.js'


const editTemplate = (data,onSubmit) =>html`
<section id="edit-page" class="edit">
    <form @submit = ${onSubmit} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Pet</legend>
            <p class="field">
                <label for="name">Name</label>
                <span class="input">
                    <input type="text" name="name" id="name" value="Milo">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description">Today, some dogs are used as pets, others are used to help humans do their work. They are a popular pet because they are usually playful, friendly, loyal and listen to humans. Thirty million dogs in the United States are registered as pets.[5] Dogs eat both meat and vegetables, often mixed together and sold in stores as dog food. Dogs often have jobs, including as police dogs, army dogs, assistance dogs, fire dogs, messenger dogs, hunting dogs, herding dogs, or rescue dogs.</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" value="/images/dog.png">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" value="dog">
                        <option value="cat" >Cat</option>
                        <option value="dog" selected>Dog</option>
                        <option value="parrot">Parrot</option>
                        <option value="reptile">Reptile</option>
                        <option value="other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>
`;

export async function editPage(ctx){
    const data = await getPetById(ctx.params.id)
    ctx.render(editTemplate(data,onSubmit))
    document.getElementById('name').value = data.name;
    document.getElementById('description').value = data.description;
    document.getElementById('image').value = data.imageUrl;
    document.getElementById('type').value = data.type;

    async function onSubmit(e) {
        e.preventDefault();
        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);

        let name = formData.get('name');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        let type = formData.get('type');
        //let _ownerId = sessionStorage.getItem(userId); 
        if (name === '' || description === '' || imageUrl === '' || type === '') {
            window.alert(`all fields must be filled`)
        } else {
            const body = {
                name,
                description,
                imageUrl,
                type
            }
            console.log(ctx.params.id);
            await editPet(ctx.params.id, body)
            ctx.setUserNav();
            ctx.page.redirect('/details/' + ctx.params.id);
        }
    }
}