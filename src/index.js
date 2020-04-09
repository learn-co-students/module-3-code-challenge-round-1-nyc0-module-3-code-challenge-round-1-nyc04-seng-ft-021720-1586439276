const beerList = document.querySelector('#list-group')
const beerDisplayTab = document.querySelector('#beer-detail')

fetch('http://localhost:3000/beers')
.then((response) => {
    return response.json();
})
.then((beerArr) => {
    beerArr.forEach(renderBeer);
    displayBeer(beerArr[0])
});

function renderBeer(beerObj){
    let beerLi = document.createElement('li')
    beerLi.classList.add("list-group-item")
    beerLi.setAttribute("id", `${beerObj.id}`)
    beerLi.innerText = `${beerObj.name}`
    
    beerLi.addEventListener("click", function(e){
        displayBeer(beerObj)
    })
    
    beerList.append(beerLi)
}

function displayBeer(beerObj){
    
    fetch(`http://localhost:3000/beers/${beerObj.id}`)
    .then((response) => {
        return response.json();
    })
    .then((singleBeer) => {
        renderDisplayBeer(singleBeer);
    });
}

function renderDisplayBeer(beerObj){
    beerDisplayTab.innerHTML = ""
    
    let displayDiv = document.createElement('div')
    displayDiv.setAttribute("id", `${beerObj.id}`)
    
    displayDiv.innerHTML = `
    <h1>${beerObj.name}</h1>
    <img src=${beerObj.image_url}>
    <h3>${beerObj.tagline}</h3>
    <textarea>${beerObj.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
    <button id="delete-beer" class="btn btn-danger">
    Delete
    </button>
    <button id="add-new-beer" class="btn btn-primary">
    Add a new beer
    </button>
    `
    beerDisplayTab.append(displayDiv)
}

beerDisplayTab.addEventListener("click", function(e){
    e.preventDefault()
    let parentDiv = e.target.closest('div')
    let description = parentDiv.querySelector('textarea').value
    if (e.target.id === "edit-beer"){
        fetch(`http://localhost:3000/beers/${parentDiv.id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description
        }),
        })
        .then((response) => response.json())
        .then(() => {})
        .catch((error) => {
        console.error('Error:', error);
        });
    } else if (e.target.id === "delete-beer"){
        fetch(`http://localhost:3000/beers/${parentDiv.id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
        },
    },
    parentDiv.innerHTML = ""
    )} 
    // else if (e.target.id ==="add-new-beer"){
    //     // renderNewBeerForm()
    // }
})

// function renderNewBeerForm(){
//     beerDisplayTab.innerHTML = ""
//     let displayDiv = document.createElement('div')
    
//     displayDiv.innerHTML = `
//     <input type="text" id="name">Name</input>
//     <input type="text" id="img_url">Image Link</input>
//     <input type="text" id="tagline">Tagline</input>
//     <input type="text" id="description">Name</input>
//     <button id="add-beer" class="btn btn-primary">
//     Save this beer!
//     </button>
//     `
    
//     beerDisplayTab.append(displayDiv)

//     displayDiv.addEventListener("submit", function(e){
//     e.preventDefault

//     let name = e.target.name.value
//     console.log(name)

//     const data = { username: 'example' };

//         fetch('http://localhost:3000/beers', {
//         method: 'POST', 
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//         })
//         .then((response) => response.json())
//         .then((data) => {
//         console.log('Success:', data);
//         })
//         .catch((error) => {
//         console.error('Error:', error);
//         });

    // })

// }
