// Declare helper variables
// #list-group ul
const listUl = document.querySelector("#list-group");
// #beer-detail div
const detailDiv = document.querySelector("#beer-detail");
// JSON url path
const url = "http://localhost:3000/beers";

// Declare helper functions
// create elements
function createNode(element) {
  return document.createElement(element);
};

// append element to parent
function append(parent, el) {
  parent.append(el);
};

// invoke getBeers function
getBeers();

// Fetch all beers
function getBeers() {
  fetch(url)
  .then(response => response.json())
  .then(beersArray => {
    beersArray.forEach(beer => {
      displayBeers(beer);
    })
  })
}

// Display a list of all Beer names in sidebar
function displayBeers(beerObj) {
  let li = createNode('li');
  li.className = "list-group-item";
  li.innerText = `${beerObj.name}`;
  append(listUl, li);

  // when a beer name is clicked, invoke beerDetail func
  li.addEventListener("click", e => {
    e.target = beerDetail(beerObj);
  });
}

// Display single beer details
function beerDetail(beerObj){
  detailDiv.innerHTML = `
    <h1>${beerObj.name}</h1>
    <img src="${beerObj.image_url}">
    <h3>${beerObj.tagline}</h3>
    <textarea>${beerObj.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
  `;
  
  // when the save button is clicked, invoke the editBeer func
  let editBtn = detailDiv.querySelector("#edit-beer");
  editBtn.addEventListener("click", e => {
    e.preventDefault();
    let desc = detailDiv.querySelector("textarea").value;
    e.target = editBeer(desc, beerObj);
  })
}

// Edit single beer details
// PATCH the object id and update the DOM
function editBeer(desc, beerObj) {
  fetch(url + `/${beerObj.id}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify({ description: desc })})
  .then(response => response.json())
  .then(beerObj.description = desc);
};