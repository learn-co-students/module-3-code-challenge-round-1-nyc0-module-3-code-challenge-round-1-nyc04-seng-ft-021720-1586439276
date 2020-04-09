console.log("Im connected")

//global scope constants
const BASE_URL = "http://localhost:3000"
const beerList = document.querySelector('#list-group')
const beerDetail = document.querySelector('#beer-detail')


//deliverable1
function getBeers() {
    return fetch(BASE_URL + '/beers')
        .then(response => response.json())
}

function renderBeers(beerObj) {
    beerLi = document.createElement('li')
    beerLi.className = 'list-group-item'
    beerLi.dataset.id = beerObj.id
    beerLi.innerHTML= `${beerObj.name}`
    beerList.append(beerLi)
}

getBeers()
.then(beerArr => {
    beerArr.forEach(renderBeers)
    renderBeerDetail(beerArr[0])
})

//deliverable2

function getOneBeer(id) {
    return fetch(BASE_URL + `/beers/${id}`)
        .then(response => response.json())
}

function renderBeerDetail(beerObj) {
    beerDetail.dataset.id = beerObj.id
    beerDetail.innerHTML = `
        <h1>${beerObj.name}</h1>
        <img src=${beerObj.image_url}>
        <h3>${beerObj.tagline}</h3>
        <textarea>${beerObj.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
        Save
        </button>
    `
}

beerList.addEventListener('click', e => {
    const id = e.target.dataset.id
    
    getOneBeer(id)
    .then(beerObj => {
        renderBeerDetail(beerObj)
    })
})

//deliverable3

function saveBeer(id, description) {
    return fetch(BASE_URL + `/beers/` +id,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify(description)
    })
        .then(response => response.json())
}

beerDetail.addEventListener('click', e => {
    const saveBtn = document.querySelector('#edit-beer')
    const beerDesc = document.querySelector('textarea').value
    const newDesc = {
        description: beerDesc
    }
    const beerId = beerDetail.dataset.id
    if (e.target === saveBtn) {
        saveBeer(beerId, newDesc)
        .then(beer => {
            beer.description = beerDesc
        })
    }
})

// I Think I'm Done

