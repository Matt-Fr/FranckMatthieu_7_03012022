import { DropdownManager } from "./dropDown.js";
import data from "./data.js";
import { RecipesManager } from "./displayRecipes.js";

new DropdownManager();
let listRecipe = data;
console.log(listRecipe);
const searchBar = document.getElementById("searchBar");
console.log(searchBar);

new RecipesManager(data);

searchBar.addEventListener("keyup", (e) => {
  e.preventDefault();
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);
  const filteredRecipes = listRecipe.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchString);
  });
  new RecipesManager(filteredRecipes);
});
