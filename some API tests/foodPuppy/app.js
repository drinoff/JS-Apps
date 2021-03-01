
function resolve(){
const inputElement = document.getElementById('input');
let searchButton = document.getElementById('searchButton');
let sectionElement = document.getElementById('toAppend')


searchButton.addEventListener('click',function (){

    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${inputElement.value}&apiKey=23b679c5d1f1469294b365a3fd3e65e5`)
    .then(res=>res.json())
    .then(data=>{
        let titlesPElement = data.results.map(recipe=>`<p id='${recipe.id}'>${recipe.title}</p>`).join(' ');

        sectionElement.innerHTML = titlesPElement;

})

sectionElement.addEventListener('mouseover', function(e){

    if(e.target.tagName.toLowerCase() === 'p'){
        e.target.style.backgroundColor = '#e7acd9';
        e.target.style.cursor = 'pointer';
          
    }   
    
})

sectionElement.addEventListener('click', function(ev){
    fetch(`https://api.spoonacular.com/recipes/${ev.target.id}/ingredientWidget?defaultCss=true&apiKey=23b679c5d1f1469294b365a3fd3e65e5`)
    .then(res=>res.json())
    .then(recipe=>{
        let newCardElement = document.createElement('li')
        newCardElement.innerHTML = recipe;
        sectionElement.appendChild(newCardElement)
    })
})

sectionElement.addEventListener('mouseout', function(e){

    if(e.target.tagName.toLowerCase() === 'p'){
        e.target.style.backgroundColor = '';   
    }  
})

})}

