import data from "./data.js";
import { RecipesManager } from "./displayRecipes.js";

export class MainSearchbar {
  constructor() {
    let listRecipe = data;
    this.searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("keyup", (e) => {
      e.preventDefault();
      const searchString = e.target.value.toLowerCase();
      console.log(searchString);
      const filteredRecipes = listRecipe.filter((recipe) => {
        return recipe.name.toLowerCase().includes(searchString);
      });
      new RecipesManager(filteredRecipes);
    });
  }
}
