import { html } from '../../node_modules/lit-html/lit-html.js';
import {createItem} from '../api/data.js';

const createTemplate = (onSubmit,isValid)=>html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control " id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control " id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`
export async function createPage(ctx){
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(event){
        event.preventDefault();

        let formData = new FormData(event.target);
        
           let make=formData.get('make');
           let model=formData.get('model');
           let year=formData.get('year');
           let description=formData.get('description');
           let price=formData.get('price');
           let img=formData.get('img');
           let material=formData.get('material');

           let isValid = validate(make,model,year,description,img);
           ctx.render(createTemplate(onSubmit,validate))
        if(isValid){
            const data = {
                make,
                model,
                year,
                description,
                price,
                img,
                material
            }
        await createItem(data);
        ctx.page.redirect('/');
        }

        function validate(make,model,year,description,img){

            let makeEl = document.getElementById('new-make');
            let modelEl = document.getElementById('new-model');
            let yearEl = document.getElementById('new-year');
            let descriptionEl = document.getElementById('new-description');
            let imgEl = document.getElementById('new-image');

            if(make.length<4){
                makeEl.classList.add('is-invalid');
            }else{
                makeEl.classList.add('is-valid');
            }

            if(model.length<4){
                modelEl.classList.add('is-invalid');
            }else{
                modelEl.classList.add('is-valid');
            }

            if(year>2050||year<1950){
                yearEl.classList.add('is-invalid');
            }else{
                yearEl.classList.add('is-valid');
            }

            if(description.length<10){
               descriptionEl.classList.add('is-invalid');
            }else{
                descriptionEl.classList.add('is-valid');
            }

            if(img == ''){
                imgEl.classList.add('is-invalid');
            }else{
                imgEl.classList.add('is-valid');    
            }

            if(makeEl.classList.contains('is-valid')&&
            modelEl.classList.contains('is-valid')&&
            yearEl.classList.contains('is-valid')&&
            descriptionEl.classList.contains('is-valid')&&
            imgEl.classList.contains('is-valid')){
                return true;
            }else{
                return false;
            } 
        }
    }

}