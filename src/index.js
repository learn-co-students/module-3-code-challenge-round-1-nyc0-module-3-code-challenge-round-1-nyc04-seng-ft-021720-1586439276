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

	// listen for clicks on the beer list
	listContainer.addEventListener('click', event => {
		if (event.target.className === 'list-group-item'){
			loadBeerDetail(event.target.dataset.id);
		}
	});

	// listen for clicks on the save button
	detailContainer.addEventListener('click', event =>{
		if (event.target.id === 'edit-beer'){
			updateBeerDescription(event.target.dataset.id);
		}
	});

	// BONUS: disable save button until edited

	// BONUS: listen for .blur on the textarea

	// BONUS: save the textarea after 2 seconds if edited

});

function addBeerToList(beer){
	// scope ??
	const listContainer = document.querySelector('#list-group');

	const newBeer = document.createElement('li');
	newBeer.className = 'list-group-item';
	newBeer.dataset.id = beer.id;
	newBeer.append(beer.name);
	listContainer.append(newBeer);
}

function addArrayOfBeersToList(beerArray){
	beerArray.forEach(beer => {
		addBeerToList(beer);
	});
}

function loadBeerDetail(beerId){
	// scope ??
	const detailContainer = document.querySelector('#beer-detail');

	fetch(BEER_ENDPOINT + '/' + beerId)
		.then(response => response.json())
		.then(beer => {
			
			const nameEl = document.createElement('h1');
			nameEl.append(beer.name);
			
			const imageEl = document.createElement('img');
			imageEl.src = beer.image_url;
			
			const taglineEl = document.createElement('h3');
			taglineEl.append(beer.tagline);

			const descriptionFieldEl = document.createElement('textarea');
			descriptionFieldEl.value = beer.description;

			const saveButtonEl = document.createElement('button');
			saveButtonEl.id = 'edit-beer';
			saveButtonEl.className = 'btn btn-info';
			saveButtonEl.dataset.id = beer.id;
			saveButtonEl.append('Save');

			beerDetailContent = [nameEl, imageEl, taglineEl, descriptionFieldEl, saveButtonEl];

			removeAllContentFromElement(detailContainer);
			detailContainer.append(...beerDetailContent);

		});

}

function removeAllContentFromElement(element){
	while (element.firstChild) {
		element.lastChild.remove();
	}
}

function updateBeerDescription(beerId){

	console.log('saving...');

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
				console.log('saved.');
			}
		})
}
