import { html} from '../../node_modules/lit-html/lit-html.js';
import { getCarById, editCar } from '../api/data.js';



const editTemplate = (onSubmit,data) =>html`
<section id="edit-listing">
    <div class="container">

        <form @submit = ${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value=${data.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value=${data.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value=${data.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value=${data.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${data.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value=${data.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
`;

export async function editPage(ctx){
    
    const data = await getCarById(ctx.params.id)
    ctx.render(editTemplate(onSubmit,data))
    
    
    async function onSubmit(e) {
        e.preventDefault();
        
        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);
        
        let brand = formData.get('brand');
        let model = formData.get('model');
        let description = formData.get('description');
        let year = Number(formData.get('year'));
        let imageUrl = formData.get('imageUrl');
        let price = Number(formData.get('price'));
        //let _ownerId = sessionStorage.getItem(userId); 
        if (brand === '' || model === '' || description === '' || year === '' || imageUrl === '' || price === '') {
            window.alert(`all fields must be filled`)
        } else {
            const body = {
                brand,
                model,
                description,
                year,
                imageUrl,
                price,
            }
            await editCar(ctx.params.id,body)
            ctx.page.redirect('/details/' + ctx.params.id);
        }
    }
}