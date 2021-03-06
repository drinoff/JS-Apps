function attachEvents() {
    let author = document.getElementById('author');
    let content = document.getElementById('content');
    let controls = document.getElementById('controls');
    let textArea = document.getElementById('messages');
    
    controls.addEventListener('click',function(e){
        
        if(e.target.value === 'Send'){
            let data = {
                author: author.value,
                content: content.value
            }

            fetch(`http://localhost:3030/jsonstore/messenger`,{
                method: 'POST',
                body: JSON.stringify(data)
            })
            
        }else if (e.target.value === 'Refresh'){
            let allMsg =[];
            fetch(`http://localhost:3030/jsonstore/messenger`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                Object.entries(data).forEach(([key,value])=>{
                   allMsg.push(`${value.author}: ${value.content}`) 
                }) 
                let toAttach = allMsg.join('\n')
                textArea.textContent = toAttach;
            })


        }
    })



}

attachEvents();