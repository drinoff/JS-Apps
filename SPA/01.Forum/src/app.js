import * as generator from "../utilities/generateElement.js";


let formElement = document.getElementsByTagName('form')[0];
let cancelBtn = document.getElementById('cancelBtn');
let postBtn = document.getElementById('postBtn');

let divTopicContainerElement = document.getElementsByClassName('topic-title')[0];
let mainElement = document.getElementsByTagName('main')[0];


window.onload = function () {
    fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
        .then(res => res.json())
        .then(data => {
            Object.entries(data).forEach(([key, value]) => {
                let title = value.title;
                let userName = value.userName;
                let postText = value.postText;
                let id = value._id;
                let date = value.date;

                let createdElement = generator.generateElement(title, userName, id, date)
                divTopicContainerElement.prepend(createdElement);
            });
        })
}


postBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let formData = new FormData(formElement);

    let title = formData.get('topicName');
    let userName = formData.get('username');
    let postText = formData.get('postText');
    let date = new Date(Date.now()).toLocaleString();
    if (title !== '' && userName !== '' && postText !== '') {
        let data = {
            title,
            userName,
            postText,
            date
        }
        fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            body: JSON.stringify(data)
        })


        fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach(([key, value]) => {
                    let title = value.title;
                    let userName = value.userName;
                    let postText = value.postText;
                    let id = value._id;
                    let date = value.date;

                    let createdElement = generator.generateElement(title, userName, id, date)
                    divTopicContainerElement.prepend(createdElement);
                });
            })
        while (divTopicContainerElement.hasChildNodes()) {
            divTopicContainerElement.removeChild(divTopicContainerElement.lastChild);
        }
        formElement.reset();

    }

})
cancelBtn.addEventListener('click', function (event) {
    event.preventDefault();
    formElement.reset();
})

divTopicContainerElement.addEventListener('click', function (e) {
    let id = e.target.parentElement.parentElement.parentElement.parentElement.id
    fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            let title = data.title;
            let userName = data.userName;
            let postText = data.postText;
            let date = data.date;
            let commentExtractingid = data._id;

            let clickedPostElement = generator.topicLoader(title, userName, postText, date);
            mainElement.innerHTML = '';
            mainElement.appendChild(clickedPostElement);

            

            fetch('http://localhost:3030/jsonstore/collections/myboard/comments')
            .then(res=>res.json())
            .then(data=>{
                
                let comments = Object.values(data).filter(x=>x.id === commentExtractingid);
                comments.forEach(x=>{
                    let currentGeneratedComment = generator.commentLoader(x.username,x.textArea,x.date,x.id)
                    mainElement.appendChild(currentGeneratedComment);
                })
                
            })
            setTimeout(30000);

            let newCommentElement = generator.commentSubmiter();
            console.log(newCommentElement)
            mainElement.appendChild(newCommentElement);
            

            let commentPostBtn = document.getElementById('commentBtn');

            commentPostBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                let commentForm = document.getElementById('commentForm')
                let formData = new FormData(commentForm)
                let username = formData.get('username');
                let textArea = formData.get('postText');
                let date = new Date(Date.now()).toLocaleString();
                let commentData = {
                    username,
                    textArea,
                    id,
                    date
                }
                fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
                    method: 'POST',
                    body: JSON.stringify(commentData)
                })
                    .then(res => res.json())
                    .then(data => {
                        let username = data.username;
                        let textArea = data.textArea;
                        let id = data.id;
                        let newComment = generator.commentLoader(username,textArea,date,id);
                        newComment.id = id;
                        let answerCommentEl = document.getElementsByClassName('answer-comment')[0];
                        
                        mainElement.insertBefore(newComment,answerCommentEl)
                        commentForm.reset();
                        
                    })
            })
        })




})





