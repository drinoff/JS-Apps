import { html } from '../../node_modules/lit-html/lit-html.js';
import { getArticleById, editArticle } from '../api/data.js';



const editTemplate = (onSubmit, data) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>
`;

export async function editPage(ctx) {

    const data = await getArticleById(ctx.params.id)
    ctx.render(editTemplate(onSubmit, data))


    async function onSubmit(e) {
        e.preventDefault();

        const editForm = document.getElementById('edit');
        let formData = new FormData(editForm);

        let title = formData.get('title');
        let category = formData.get('category');
        let content = formData.get('content');

        //let _ownerId = sessionStorage.getItem(userId); 
        if (title === '' || category === '' || content === '') {
            return window.alert('all fields must be filled')
        }
        let categoryContent = ['JavaScript', 'C#', 'Java', 'Python']
        if (!categoryContent.includes(category)) {
            return window.alert('Category not correct')
        }
        const data = {
            title,
            category,
            content
        }
        await editArticle(ctx.params.id, body)
        ctx.page.redirect('/details/' + ctx.params.id);
    }

}