const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContainer = document.getElementById("meal-details-container");

const backButton = document.getElementById("back-button");

let meals = [];

const fetchMeals = async (query) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await response.json();
  meals = data.meals || [];
  displaySearchResults(meals);
};
const displaySearchResults = (meals) => {
  searchResults.innerHTML = "";
  meals.forEach((meal) => {
    const resultItem = document.createElement("li");
    resultItem.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <p>${meal.strMeal}</p>
    <button class="favourite-btn">Add to Favourite</button>
    `;
    const favouriteBtn = resultItem.querySelector(".favourite-btn");
    favouriteBtn.addEventListener("click", displayMealDetails(meal));
    searchResults.appendChild(resultItem);
  });
};
const openMealDetails = (meal) => {
  mealDetails.style.display = "block";
  displayMealDetails(meal);
  searchResults.style.display = "none";
  searchContainer.style.display = "none";
};
const closeMealDetails = () => {
  mealDetails.style.display = "none";
  searchResults.style.display = "grid";
  searchContainer.style.display = "inline";
};
const displayMealDetails = (meal) => {
  mealDetailsContainer.innerHTML = `
  <h2 id="displayHeader">${meal.strMeal}</h2>
  <img id="displayImage"src="${meal.strMealThumb}" alt="${meal.strMeal}">
  <h3 id="instructionsHeader">Instuctuction</h3>
  <p id="instructionsParagraph">${meal.strInstructions}</p>
  <button id="closeDetailButton">Close</button>
  `;
  const closeDetailButton = document.getElementById("closeDetailButton");
  closeDetailButton.addEventListener("click", closeMealDetails);
};
searchInput.addEventListener("input", () => {
  const query = searchInput.value;
  fetchMeals(query);
});
searchResults.addEventListener("click", (event) => {
  const mealItem = event.target.closest("li");
  if (mealItem) {
    const mealName = mealItem.querySelector("p").textContent;
    const selectedMeal = meals.find((meal) => meal.strMeal === mealName);
    if (selectedMeal) {
      openMealDetails(selectedMeal);
    }
  }
});

backButton.addEventListener("click", closeMealDetails);
// for practice
// let FavouriteList = document.querySelector(".favourites-all");
// let body = document.querySelector(".body");
// let closeShopping = document.querySelector(".closeShopping");
// let listCard = document.querySelector(".listCard");

// FavouriteList.addEventListener("click", () => {
//   body.classList.add("active");
// });
// closeShopping.addEventListener("click", () => {
//   body.classList.remove("active");
// });
// let listCards = [];
// function addToFavourites(meal) {
//   if (listCards[meal] === null) {
//     listCards[meal] = JSON.parse(JSON.stringify(meal));
//   }
//   reloadCard();
// }
// function reloadCard() {
//   listCard.innerHTML = "";
//   listCards.forEach((meal) => {
//     let newDiv = document.createElement("li");
//     newDiv.innerHTML = `
//     <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//     <p>${meal.strMeal}</p>
//     `;
//     listCard.appendChild(newDiv);
//   });
// }

fetchMeals(`a`);
