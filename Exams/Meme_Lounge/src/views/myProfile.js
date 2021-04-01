import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyMemes } from '../api/data.js'


const myProfileTemplate = (data) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        ${sessionStorage.getItem('gender') === 'male'
        ? html`<img id="user-avatar-url" alt="user-profile" src="/images/male.png">`
        : html`<img id="user-avatar-url" alt="user-profile" src="/images/female.png">`}
        <div class="user-content">
            <p>Username: ${sessionStorage.getItem('username')}</p>
            <p>Email: ${sessionStorage.getItem('email')}</p>
            <p>My memes count: ${data.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${data.map((x)=>itemTemplate(x))}

    </div>
</section>
`;

let itemTemplate = (item) => html`
<div class="user-meme">
    <p class="user-meme-title">${item.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
    <a class="button" href="/details" ${item._id}>Details</a>
</div>
`;
// const emptyProfileTemplate = (data) => html`
// <section id="user-profile-page" class="user-profile">
//     <article class="user-info">
//         ${sessionStorage.getItem('gender') === 'male'
//         ? html`<img id="user-avatar-url" alt="user-profile" src="/images/male.png">`
//         : html`<img id="user-avatar-url" alt="user-profile" src="/images/female.png">`}
//         <div class="user-content">
//             <p>Username: ${sessionStorage.getItem('username')}</p>
//             <p>Email: ${sessionStorage.getItem('email')}</p>
//             <p>My memes count: ${data.length}</p>
//         </div>
//     </article>
//     <h1 id="user-listings-title">User Memes</h1>

//     <p class="no-memes">No memes in database.</p>
// `;

export async function myProfilePage(ctx) {
    const userId = sessionStorage.getItem('userId');
    
    const data = await getMyMemes(userId)
    //if (data.length!=0) {
        console.log(data);
        console.log(data.map(x=>itemTemplate(x)))
        ctx.render(myProfileTemplate(data));
    // } else {
      //  ctx.render(emptyProfileTemplate(data))
    // }
}