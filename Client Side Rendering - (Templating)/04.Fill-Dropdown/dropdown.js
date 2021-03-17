import { html, render } from 'https://unpkg.com/lit-html?module';

function addItem() {
    const selectElement = document.getElementById('menu');
    const submitBtn = document.getElementById('submit');
    window.onload = function () {
        fetch('http://localhost:3030/jsonstore/advanced/dropdown')
            .then(res => res.json())
            .then(data => {

                let dataValues = Object.values(data);
                let optionTemplate = dataValues.map(x => html`<option id=${x._id}>${x.text}</option>`)
                console.log(optionTemplate)
                render(optionTemplate, selectElement);
            })
    }
    submitBtn.addEventListener('click',function(e){
        e.preventDefault();
        let data = document.getElementById('itemText').value;
        fetch('http://localhost:3030/jsonstore/advanced/dropdown',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(response=>{
            let id = response._id;
            let text = data;
            let elementToAdd = `<option id=${id}>${text}</option>`;
            selectElement.innerHTML +=elementToAdd;
            
        })

    })

}
addItem();