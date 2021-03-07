// Изчистил съм хардКоднатите книги ,
// за да може да лоадна книгите от сървъра
// и да може всичко в таблицата да бъде и
// в Базата от Данни. Понеже пак не мога 
// да разбера какво точно искат. Да остават
// ли тези хардкоднати книги , но едната я 
// няма в сървъра и така. Генерално решение 
// махам всичко и лоудвам от ДатаБазата.
//Стана голям мазаляк но работи :)
//Дори само си ъпдейтва след EDIT

const loadBtn = document.getElementById('loadBooks');
const tableBodyElement = document.getElementsByTagName('tbody')[0];
const formElement = document.getElementsByTagName('form')[0];
const submitBtn = document.querySelector('body > form > button');
let h3Element = document.getElementsByTagName('h3')[0];
let editTitleElement = document.querySelector('body > form > input[type=text]:nth-child(3)');
let editAuthorElement = document.querySelector('body > form > input[type=text]:nth-child(5)');
const url = `http://localhost:3030/jsonstore/collections/books`;
let books = [];
let editTrigger = '';

loadBtn.addEventListener('click', function () {

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (tableBodyElement.hasChildNodes()) {
                while (tableBodyElement.hasChildNodes()) {
                    tableBodyElement.lastElementChild.remove();
                }
            }
            Object.entries(data).forEach(([key, value]) => {
                let author = value.author;
                let title = value.title;
                let serverId = key;

                books.push(title);
                books.push(author);

                let trElement = generateElement('tr', '');
                trElement.id = serverId;
                books.forEach((x) => {
                    let currThEl = generateElement('th', x);
                    trElement.appendChild(currThEl);

                })
                books = [];

                let editBtn = generateElement('button', 'Edit');
                let deleteBtn = generateElement('button', 'Delete');
                trElement.appendChild(editBtn);
                trElement.appendChild(deleteBtn);
                tableBodyElement.appendChild(trElement);

            });
        })

})
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (submitBtn.textContent === 'Submit') {
        let formData = new FormData(formElement);
        let title = formData.get('title');
        let author = formData.get('author');
        books.push(title);
        books.push(author);
        let trElement = generateElement('tr', '');

        books.forEach((x) => {
            let currThEl = generateElement('th', x);

            trElement.appendChild(currThEl);

        })

        let editBtn = generateElement('button', 'Edit');
        let deleteBtn = generateElement('button', 'Delete');
        trElement.appendChild(editBtn);
        trElement.appendChild(deleteBtn);

        books = [];
        let data = {
            author,
            title
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                let id = data._id;
                trElement.id = id;
            })

        tableBodyElement.appendChild(trElement);
        formElement.reset();
    } else {
        let formData = new FormData(formElement);
        editedTitle = formData.get('title');
        editedAuthor = formData.get('author');
        let data = {
            'title': editedTitle,
            'author': editedAuthor

        }
        fetch(url + '/' + editTrigger, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        h3Element.textContent = 'Form';
        formElement.reset();
        submitBtn.textContent = 'Submit';
        
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if (tableBodyElement.hasChildNodes()) {
                while (tableBodyElement.hasChildNodes()) {
                    tableBodyElement.lastElementChild.remove();
                }
            }
            Object.entries(data).forEach(([key, value]) => {
                let author = value.author;
                let title = value.title;
                let serverId = key;

                books.push(title);
                books.push(author);

                let trElement = generateElement('tr', '');
                trElement.id = serverId;
                books.forEach((x) => {
                    let currThEl = generateElement('th', x);
                    trElement.appendChild(currThEl);

                })
                books = [];

                let editBtn = generateElement('button', 'Edit');
                let deleteBtn = generateElement('button', 'Delete');
                trElement.appendChild(editBtn);
                trElement.appendChild(deleteBtn);
                tableBodyElement.appendChild(trElement);

            });
        })
    }




})

tableBodyElement.addEventListener('click', function (e) {
    if (e.target.textContent === 'Delete') {
        e.target.parentElement.remove();
        fetch(url + '/' + e.target.parentElement.id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(data => {
                console.log(data);
            })
    } else if (e.target.textContent === 'Edit') {
        let formData = new FormData(formElement);
        h3Element.textContent = 'Edit Form';
        editTitleElement.value = e.target.parentElement.firstElementChild.textContent
        editAuthorElement.value = e.target.previousSibling.textContent
        submitBtn.textContent = 'Save';
        editTrigger = e.target.parentElement.id;

    }

})



function generateElement(type, content) {
    const result = document.createElement(type);
    result.textContent = content;


    return result;
}