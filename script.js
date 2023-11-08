
//for random meal

let mealName = document.querySelectorAll("#meal-name")
let mealThumbnail = document.querySelector("#meal-thumbnail")
let mealIng = document.getElementById("meal-ing")

// for navbar and search results

let form = document.getElementsByTagName("form")[0]
let searchResult = document.getElementById("search-result")
let searchBar = document.getElementById("search-bar")
let searchTitle = document.getElementById("search-title")
let slidebar = document.getElementById("slidebar")
let message = document.getElementById("title-message")

//for modal

let modal = document.getElementById("modal")
let allIng = document.getElementById("allingredients")
let closeBtn = document.getElementById("closeBtn")
let modalBtn = document.getElementById("modalBtn")
let body = document.getElementsByTagName("body")[0]
let modalThumbnail = document.getElementById("modal-thumbnail")
let overlay = document.getElementsByClassName("overlay")[0]

// responsive navbar

slidebar.addEventListener("click", () => {
    message.classList.toggle("show-message")
})


//open modal

modalBtn.addEventListener("click", () => {
    modal.classList.toggle("pop-up")
    overlay.style.display = "inherit"
    
})

//close modal

closeBtn.addEventListener("click", () => {
    modal.classList.toggle("pop-up")
    overlay.style.display = "none"
})


function getRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            appendRandomMeal(data) //to append the received data
        })
        .catch((err) => console.log(err))
}

getRandomMeal()



function appendRandomMeal(data) {

    const meal = data.meals[0]

    mealName.forEach((name) => {
        name.innerHTML = meal.strMeal
    })

    mealThumbnail.src = meal.strMealThumb
    modalThumbnail.src = meal.strMealThumb
    
    for(let i = 1;i <= 5;i++){
        const ingredient = `strIngredient${i}`
        const measure = `strMeasure${i}`
        if (meal[ingredient] !== "" && meal[ingredient] !== null && meal[measure] !== "" && meal[measure] !== null){
            let li = document.createElement("li")
            li.innerText = `${meal[ingredient]},${meal[measure]}`
            mealIng.append(li)
        } else{
            break // to stop when there are no more ingredients
        }
    }

    mealIng.lastChild.innerText += "..." // to show there are more ingredients

    for(let i = 1;i <= 20;i++) {
        const ingredient = `strIngredient${i}`
        const measure = `strMeasure${i}`
        if (meal[ingredient] !== "" && meal[ingredient] !== null && meal[measure] !== "" && meal[measure] !== null){
            let li = document.createElement("li")
            li.innerText = `${meal[ingredient]},${meal[measure]}`
            allIng.append(li)
        } else{
            break
        }
    }
    
    let p = document.createElement("p")
    p.classList.add("instructions")
    p.innerText = meal.strInstructions
    const modalDetails = document.getElementById("modal-details")
    modalDetails.append(p)
    modalDetails.innerHTML += `<button id="watchBtn"><a href=${meal.strYoutube} target=_blank>Watch in youtube</a></button>`
}


// call the function when user searches

form.addEventListener("submit", (event) => {
    event.preventDefault()
    getResults() // to get search results
    window.open("#search-result", "_self") // scroll to search results
})



function getResults() {
    
    searchResult.innerHTML = "" // to refresh content
    const searchItem = searchBar.value
    searchTitle.style.visibility = "visible"
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchItem}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        appendSearchResults(data)
    })
    .catch((err) => console.log(err))

    const categoryName = document.getElementById("category-name")
    categoryName.innerText = searchBar.value
}


function appendSearchResults(data) {
    if(data.meals !== null){  
        const meals = data.meals
        meals.forEach(meal => {
            searchResult.innerHTML  += `<div class="recipe">
            <img class="recipe-thumb" src=${meal.strMealThumb} alt="">
            <p>${meal.strMeal}</p>
        </div>`
    })
    } else { // show no results when data is null
        searchResult.innerHTML += `<p id=no-result>No category found :(<p>`
    }
}