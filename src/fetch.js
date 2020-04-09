const BASE_URL = 'http://localhost:3000/beers/'

function beerFetcher(){
    return fetch(BASE_URL)
    .then(response => response.json())
}

function beerUpdater(newDescription, beerID){
    fetch(BASE_URL + beerID, {
        headers: {
            "Content-type": "application/json"
            },
        method: "PATCH",
        body: JSON.stringify({
        description: newDescription
        })
    })
}

function deleteBeer(beerID) {
    return fetch(BASE_URL + beerID, {
      method: 'delete'
    })
    .then(response => {
        if(response.ok){
           return response.json()
        }
    });
  }

  function beerCreate(beerObject){
   return fetch(BASE_URL, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(beerObject),
      })
      .then(response => {
          if(response.ok){
              return response.json()
          }
      })
  }