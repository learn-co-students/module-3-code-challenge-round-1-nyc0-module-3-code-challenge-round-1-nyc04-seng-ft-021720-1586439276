let beerList = document.querySelector('#list-group')
let beerDetail = document.querySelector('#beer-detail')
let beerSort = document.querySelector('#sort-beer')

function beerAdder(beerObject){
    let beerListItem = document.createElement('li')
    beerListItem.className = "list-group-item"
    beerListItem.dataset.id = beerObject.id
    beerListItem.innerText = beerObject.name 
    beerList.append(beerListItem)
}

beerFetcher()
.then(beerObject => beerObject.forEach(beer => beerAdder(beer)))


function addBeerDetails(beerObject){

    let foodPairings = beerObject.food_pairing
    let lastFood = foodPairings.pop()
    foodPairings = "It goes great with " + foodPairings.join(", ") + `and ${lastFood}`

    beerDetail.innerHTML = `<h1>${beerObject.name}</h1>
                            <img src="${beerObject.image_url}">
                            <h3>${beerObject.tagline}</h3>
                            <p> ${foodPairings} </p>
                            <textarea>${beerObject.description}</textarea>
                            <button id="edit-beer" class="btn btn-info">
                            Save
                            </button>
                            <button id="delete-beer" class="btn btn-info">
                            Delete
                            </button>
                            <div>
                            </div>
                            
                            <form name="createBeer" id="createBeer" method="post">    
                            <label for="fname">Name of Beer:</label>
                            <input type="text" id="name" name="beer_name"><br><br>
                            <label for="image">Image URL:</label>
                            <input type="text" id="image" name="image_url"><br><br>
                            <label for="image"> Tagline </label>
                            <input type="text" id="tagline" name="tagline"><br><br>
                            <label for="image"> Description </label>
                            <input type="text" id="description" name="description"><br><br>
                            <label for="image">Food Pairings (separated with a space):</label>
                            <input type="text" id="food_pairing" name="food_pairing"><br><br>
                            <input type="submit" id="create_beer" value="Submit" class="btn btn-info">
                            </form>
                            `

    beerDetail.dataset.id = beerObject.id
}


beerList.addEventListener('click', beerListAdder)


function beerListAdder(e){
    if(e.target.matches('.list-group-item')){
        let beerID = parseInt(e.target.dataset.id)
        beerFetcher()
        .then(beerObject => {
            addBeerDetails(beerObject.find(beer=> beer.id === beerID))
        })
    }
}


function beerDetailModifier(e){
    let beerID = parseInt(beerDetail.dataset.id)
    if(e.target.matches('#edit-beer')){
       let newDescription =  e.target.previousElementSibling.value 
       //Real life situation ^ bad, since you never know if a sibling element will change.
       beerUpdater(newDescription, beerID)  
    }
    else if(e.target.matches('#delete-beer')){
        deleteBeer(beerID)
        .then(response => {
            beerDetail.innerHTML = ''
            let beerLI = beerList.querySelector(`[data-id = "${beerID}"]`)
            beerLI.remove()
        })
    }
    else if(e.target.matches('#create_beer')){
        e.preventDefault()
        let name = beerDetail.querySelector('#name').value
        let image_url = beerDetail.querySelector('#image').value
        let tagline = beerDetail.querySelector('#tagline').value 
        let description = beerDetail.querySelector('#description').value 
        let food_pairing = beerDetail.querySelector('#food_pairing').value 
        food_pairing = food_pairing.split(' ')
        beerObject = {
            name,
            image_url,
            tagline,
            description,
            food_pairing
        }
        beerCreate(beerObject)
        .then(response => beerAdder(response))
    }
}

beerDetail.addEventListener('click', beerDetailModifier)

beerSort.addEventListener('click', e=>{
    beerFetcher()
    .then(beers =>{
      let sorted =  beers.sort((beer1, beer2) => {
            return (beer1.name).localeCompare(beer2.name)
        })
        beerList.innerHTML = ""
        sorted.forEach(beer => beerAdder(beer))
    })
})