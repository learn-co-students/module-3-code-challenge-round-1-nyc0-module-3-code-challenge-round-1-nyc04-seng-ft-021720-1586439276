const beerList = document.querySelector("#list-group") 
const beerDetail = document.querySelector("#beer-detail")

// Example beer
// {
//   "id": 1,
//   "name": "Buzz",
//   "tagline": "A Real Bitter Experience.",
//   "first_brewed": "09/2007",
//   "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
//   "image_url": "https://images.punkapi.com/v2/keg.png",
//   "food_pairing": [
//     "Spicy chicken tikka masala",
//     "Grilled chicken quesadilla",
//     "Caramel toffee cake"
//   ],
//   "brewers_tips": "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
//   "contributed_by": "Sam Mason <samjbmason>"
// },

fetch('http://localhost:3000/beers')
  .then(resp => resp.json())
  .then(beerArr => {
    beerArr.forEach( beer => {
      let beerLi = document.createElement("li")
      beerLi.className = "list-group-item"
      beerLi.innerText = beer.name
      beerLi.addEventListener("click", e => {
        console.log(beer)
        beerDetail.innerHTML = `
        <h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
          Save
        </button>
        `
        beerDetail.querySelector("#edit-beer").addEventListener("click", e => {
          fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              description: e.target.parentElement.querySelector("textarea").value
            })
          })          
        })
      })
      beerList.append(beerLi)
    })
  })