// Изчистил съм хардКоднатите книги ,
// за да може да лоадна книгите от сървъра
// и да може всичко в таблицата да бъде и
// в Базата от Данни. Понеже пак не мога 
// да разбера какво точно искат. Да остават
// ли тези хардкоднати книги , но едната я 
// няма в сървъра и така. Генерално решение 
// махам всичко и лоудвам от ДатаБазата.

const loadBtn = document.getElementById('loadBooks');
const tableBodyElement = document.getElementsByTagName('tbody')[0];
const formElement = document.getElementsByTagName('form')[0];
const submitBtn = document.querySelector('body > form > button');
const url = `http://localhost:3030/jsonstore/collections/books`;
let books = [];

loadBtn.addEventListener('click', function () {

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (tableBodyElement.hasChildNodes()) {
                while (tableBodyElement.hasChildNodes()) {
                    tableBodyElement.lastElementChild.remove();
                }
            }
            Object.entries(data).forEach(([key, value]) => {
                let author = value.author;
                let title = value.title;
                let serverId = value._id;
                
                

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
    fetch(url,{
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>{
        let id = data._id;
        trElement.id = id;
        console.log(trElement.id);
    })
    
    tableBodyElement.appendChild(trElement);
    formElement.reset();

})

tableBodyElement.addEventListener('click',function(e){
    if(e.target.textContent === 'Delete'){

    }
})



function generateElement(type, content) {
    const result = document.createElement(type);
    result.textContent = content;
    

    return result;
}