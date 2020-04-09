const BASE_URL = 'http://localhost:3000/beers'

fetch(BASE_URL)
.then(response => response.json())
.then(beers => {
  beers.forEach(beer => renderBeer(beer))
})

const beerList = document.querySelector('#list-group')
const beerDiv = document.querySelector('#beer-detail')
const beerDetail = document.querySelector('#beer-detail')

const beerHeader = document.querySelector('h2')
beerHeader.style.textShadow = "2px 2px indianred"

function renderBeer(beer){
  const beerLi = document.createElement('li')
  beerLi.dataset.id = beer.id
  beerLi.setAttribute('class', 'list-group-item')
  beerLi.textContent = `${beer.name}`
  beerList.append(beerLi)
  
  beerLi.addEventListener('click', () => {renderBeerDetail(beer)})
}

function renderBeerDetail(beer){
  beerDetail.innerHTML = ""
  
  let name = document.createElement('h1')
  name.textContent = `${beer.name}`
  beerDetail.append(name)

  let image = document.createElement('img')
  image.src = `${beer.image_url}`
  beerDetail.append(image)

  let tagline = document.createElement('h3')
  tagline.textContent = `${beer.tagline}`
  beerDetail.append(tagline)

  let container = document.createElement('div')
  container.setAttribute('class', 'container')
  container.innerHTML = `<br><p>${beer.description}</p><br>`
  beerDetail.append(container)

  let edit = document.createElement('button')
  edit.textContent = 'Edit Description'
  edit.setAttribute('id', 'edit-beer')
  edit.setAttribute('class', 'btn btn-info')
  beerDetail.append(edit)

  let save = document.createElement('button')
  save.style.display = "none"
  save.setAttribute('id', 'edit-beer')
  save.setAttribute('class', 'btn btn-info')
  save.textContent = 'Save'
  beerDetail.append(save)

  let foodPairingUl = document.createElement('ul')
  foodPairingUl.innerHTML = `<br>
  <li>${beer.food_pairing[0]}</li>
  <li>${beer.food_pairing[1]}</li>
  <li>${beer.food_pairing[2]}</li>`
  beerDetail.append(foodPairingUl)

  let tips = document.createElement('p')
  tips.textContent = `${beer.brewers_tips}`
  beerDetail.append(tips)

  edit.addEventListener('click', () => {
    container.innerHTML = ""
    container.innerHTML = `<br><textarea class="edit-text">${beer.description}</textarea><br>`
    edit.style.display = "none"
    save.style.display = "block"
    let editText = event.target.parentElement.querySelector('.edit-text')
    editText.style.marginBottom = "11px"

    save.addEventListener('click', () => {
      fetch(BASE_URL + `/${beer.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: editText.value
        }),
      })
      .then(response => {
        if(response.ok){
          container.innerHTML = ""
          container.innerHTML = `<br><p>${editText.value}</p><br>`
        }
      })
      save.style.display = "none"
      edit.style.display = "block"
    })


  })
}

// function renderBeerDetail({name, image_url, tagline, description}){
//   beerDetail.innerHTML = ""
//   beerDetail.innerHTML = `
//     <h1>${name}</h1>
//     <img src="${image_url}">
//     <h3>${tagline}</h3>
//     <textarea>${description}</textarea>
//     <button id="edit-beer" class="btn btn-info">
//       Save
//     </button>`
// }