console.log("test")

fetch("http://localhost:3000/beers")
    .then(r => r.json())
    .then(beerData => {
        console.log(beerData)
        renderAllBeers(beerData)
    })



    function renderAllBeers(beerArray){
        beerArray.forEach(renderSidebar)
    }

    function renderSidebar(beer){
        const beerGroup = document.querySelector("#list-group") 
    
        const beerLi = document.createElement("li")
        beerLi.className = "item"
        beerLi.dataset.id = beer.id
        beerLi.textContent = beer.name

        beerGroup.append(beerLi)

        beerLi.addEventListener("click", e =>{
            renderBeerDetail(beer)
        })
    }
function renderBeerDetail(beer){
    const beerDetail = document.querySelector("#beer-detail")
beerDetail.innerHTML = `
<h1>${beer.name}</h1>
<img src=${beer.image_url}>
<h3>${beer.tagline}</h3>
<textarea name="description">${beer.description}</textarea>
<button id="edit-beer" class="btn btn-info">
  Save
</button>
`


const saveBtn = beerDetail.querySelector("#edit-beer")

saveBtn.addEventListener('submit', e => {
    e.preventDefault

    const newDescription = {
        description: e.target.description.value
    }

    fetch("http://localhost:3000/beers/:id"), {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify({description: newDescription})
        
     }
  
})
}



