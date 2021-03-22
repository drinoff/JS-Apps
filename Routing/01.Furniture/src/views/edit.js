import { html } from '../../node_modules/lit-html/lit-html.js'
import { editItem, getItemById } from '../api/data.js'

const editTemplate = (data, onSubmit) => html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" value=${data.make}>
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid" id="new-model" type="text" name="model" value=${data.model}>
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${data.year}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name='description'
                        value=${data.description}>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" value=${data.price}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" value=${`.${data.img}`}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material" value=${data.material}>
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>
</div>
`

export async function editPage(ctx) {
    const data = await getItemById(ctx.params.id);
    ctx.render(editTemplate(data, onSubmit));


    async function onSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let make = formData.get('make');
        let model = formData.get('model');
        let year = formData.get('year');
        let description = formData.get('description');
        let price = formData.get('price');
        let img = formData.get('img');
        let material = formData.get('material');

        let submitData = {
            make,
            model,
            year,
            description,
            price,
            img,
            material
        }
        await editItem(ctx.params.id, submitData);
        ctx.page.redirect('/')

    }
};
