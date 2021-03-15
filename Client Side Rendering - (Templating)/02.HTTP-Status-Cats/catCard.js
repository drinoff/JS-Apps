import {html} from 'https://unpkg.com/lit-html?module';

const catCard = (cats)=> html`
<li>
    <img src="./images/${cats.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id=${cats.id}>
            <h4>Status Code: ${cats.statusCode}</h4>
            <p>${cats.statusMessage}</p>
        </div>
    </div>
</li>
`
export {catCard};
