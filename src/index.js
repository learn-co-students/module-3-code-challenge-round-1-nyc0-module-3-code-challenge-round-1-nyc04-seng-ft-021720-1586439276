// API endpoints
const BASE_URL = 'http://localhost:3000';
const BEER_ENDPOINT = BASE_URL + '/beers';

document.addEventListener('DOMContentLoaded', function(){

	// grab some elements
	const listContainer = document.querySelector('#list-group');
	const detailContainer = document.querySelector('#beer-detail');

	// load initial beer list from server
	fetch(BEER_ENDPOINT)
		.then(response => response.json())
		.then(addArrayOfBeersToList);

	


});

function addBeerToList(beer){

	// scope ??
	const listContainer = document.querySelector('#list-group');

	// <li class="list-group-item">Beer title 1</li>

	const newBeer = document.createElement('li');
	newBeer.className = 'list-group-item';
	// refactor this into a delegated event listener
	newBeer.onclick = function(){loadBeerDetail(beer.id);}
	newBeer.append(beer.name);
	listContainer.append(newBeer);
}

function addArrayOfBeersToList(beerArray){
	beerArray.forEach(beer => {
		addBeerToList(beer);
	});
}

function loadBeerDetail(beerId){
	
	const detailContainer = document.querySelector('#beer-detail');

	fetch(BEER_ENDPOINT + '/' + beerId)
		.then(response => response.json())
		.then(beer => {

			detailContainer.innerHTML = `
			<h1>${beer.name}</h1>
			<img src="${beer.image_url}">
			<h3>${beer.tagline}</h3>
			<textarea>${beer.description}</textarea>
			<button id="edit-beer" class="btn btn-info" onclick="updateBeerDescription(${beer.id})">
			Save
			</button>
			`;

		});

}

function updateBeerDescription(beerId){
	const descriptionField = document.querySelector('textarea');
	const newDescription = descriptionField.value;
	
	// update the server
	fetch(BEER_ENDPOINT + '/' + beerId, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({description: newDescription})
	})
		.then(response => {
			if (response.ok) {
				// nothing, the DOM is already good-to-go
			}
		})
}