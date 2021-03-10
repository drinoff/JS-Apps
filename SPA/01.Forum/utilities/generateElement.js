export function generateElement(title, userName, id, date) {
    let result = document.createElement('div');
    result.classList.add('topic-container')
    result.id = id;
    result.innerHTML = `
    <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="#" class="normal">
                    <h2>${title}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${date}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${userName}</span></p>
                        </div>
                    </div>
                    <div class="subscribers">
                        <p>Subscribers: <span>0</span></p>
                    </div>
                </div>
            </div>
        </div>
    `

    return result;
}

export function topicLoader(title, userName, postText, date) {
    let result = document.createElement('div');
    result.classList.add('topic-title')
    result.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <h2>${title}</h2>
            <p>Date: <time>${date}</time></p>
        </div>
        <div class="subscribers">
            <p>Subscribers: <span>0</span></p>
        </div>
    </div>
    <div class="comment">
        <header class="header">
            <p><span>${userName}</span> posted on <time>${date}</time></p>
        </header>
        <div class="comment-main">
            <div class="userdetails">
                <img src="./static/profile.png" alt="avatar">
            </div>
            <div class="post-content">
                <p>${postText}</p>
            </div>
        </div>
        <div class="footer">
            <p><span>0</span> likes</p>
        </div>
    </div>
        `
    return result;

}
export function commentLoader(userName,comment,date,id) {
    let result = document.createElement('div');
    result.classList.add('comment')
    result.id = id;
    result.innerHTML = `
<header class="header">
    <p><span>${userName}</span> posted on <time>${date}</time></p>
</header>
<div class="comment-main">
    <div class="userdetails">
        <img src="./static/profile.png" alt="avatar">
    </div>
    <div class="post-content">
        <p>${comment}</p>
    </div>
</div>
<div class="footer">
    <p><span>0</span> likes</p>
</div>
`
return result;
}

export function commentSubmiter(){
    let result = document.createElement('div');
    result.classList.add('answer-comment')
    result.innerHTML =`
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form id="commentForm">
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button id="commentBtn">Post</button>
        </form>
    </div>
    ` 
    return result;
}

