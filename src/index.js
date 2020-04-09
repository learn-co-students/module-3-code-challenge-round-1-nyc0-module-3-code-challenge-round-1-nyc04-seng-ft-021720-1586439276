//querys
let beerNameContainer = document.getElementById("list-group")
let beerDetailContainer = document.getElementById("beer-detail")
//makes detail page stay on the right
//document.getElementById("beer-detail").style.right="100px" 


//gets beer info from json server and 
//adds the name to the left
fetch('http://localhost:3000/beers')
.then(response => response.json())
.then(beerInfo => {
beerInfo.forEach(addBeerName)
})
//adds beerinfo to beers list
function addBeerName(beerInfo){
//console.log(beerInfo)
    let  li = document.createElement("li")
    //li.className = "list-group-item"
    li.innerHTML = `
    <li class="list-group-item">${beerInfo.name}</li>
    `
    beerNameContainer.append(li)
    let beerNameButtonContainer = li.querySelector(".list-group-item")
    //event listener to change detail page to match the beer
    beerNameButtonContainer.addEventListener("click", () => {
        beerDetailContainer.innerHTML = `
          <h1>${beerInfo.name}</h1>
    <img src="${beerInfo.image_url}">
    <h3>${beerInfo.tagline}</h3>
    <textarea>${beerInfo.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>
        `
        
    })
    /*
    //finds edit  button
    let beerEditButton = li.querySelector(".btn btn-info")
    //adds event listener to edit/save button
    beerEditButton.addEventListener("click",() => {
        //changes the description on the server/backend
       // console.log(beerInfo.id)
        let editText = li.querySelector("textarea")
        console.log(editText)
        fetch(`http://localhost:3000/beers/${beerInfo.id}`, {
            method: "PATCH",
            headers:
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify({
                description: editText.value
            })
            .then(response => response.json())
            .then(newText => {
                editText.innerHTML = newText
                })
        })
    })
*/

}




