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
    <textarea id="description">${beerObj.description}</textarea>
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
    let description = parentDiv.querySelector('#description').value
    
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
    else if (e.target.id ==="add-new-beer"){
        renderNewBeerForm()
    }
})

function renderNewBeerForm(){
    beerDisplayTab.innerHTML = ""
    let displayDiv = document.createElement('div')

    
    displayDiv.innerHTML = `
    <form id=add-new-beer-form>
    <input type="text" id="name">Name</input>
    <input type="text" id="image_url">Image Link</input>
    <input type="text" id="tagline">Tagline</input>
    <input type="textarea" id="description">Description</input>
    <button type="submit" id="submit" class="btn btn-primary">
    Add this beer!
    </button>
    </form>
    `
    
    beerDisplayTab.append(displayDiv)
    let form = displayDiv.querySelector('#add-new-beer-form')
    form.addEventListener("click", function(e){
    e.preventDefault

    
    let name = form.name.value
    let image_url = form.image_url.value
    let tagline = form.tagline.value
    let description = form.description.value
    
        if (e.target.id ==="submit"){
        fetch('http://localhost:3000/beers', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            image_url,
            tagline,
            description
        }),
        })
        .then((response) => response.json())
        .then((beerObj) => {
        console.log('Success:', beerObj);
        renderDisplayBeer(beerObj)
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
    })

}
