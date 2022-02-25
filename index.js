import { DropdownManager } from "./dropDown.js";
import data from "./data.js";
import { DisplayRecipes } from "./displayRecipes.js";
import { MainSearchbar } from "./mainSearchbar.js";
import { Recipe } from "./recipe.js";
import { DisplayTagsInDropdown } from "./displayTagsinDropdown.js";
import { AddAndDeleteFilters } from "./addAndDeletefilter.js";

new DropdownManager();

new DisplayRecipes(data);

new DisplayTagsInDropdown();

const allTagsIngredients = document.querySelectorAll(".tagsIngredient");
const allTagsAppliances = document.querySelectorAll(".tagsAppliances");
const allTagsUstensiles = document.querySelectorAll(".tagsUstensiles");
let ingredientFilter = [];
let applianceFilter = [];
let ustensileFilter = [];

new AddAndDeleteFilters(allTagsIngredients, "ingredient", ingredientFilter);
new AddAndDeleteFilters(allTagsAppliances, "appliance", applianceFilter);
new AddAndDeleteFilters(allTagsUstensiles, "ustensile", ustensileFilter);

const recipes = [];

data.forEach((oneRecipe) => {
  const recipe = new Recipe(oneRecipe);
  recipes.push(recipe);
});

export const filtersRecipe = () => {
  console.log(ingredientFilter);
  console.log(applianceFilter);
  console.log(ustensileFilter);
  const matchingRecipes = recipes.filter((recipe) => {
    return recipe.isMatchingAllFilters(
      ingredientFilter,
      applianceFilter,
      ustensileFilter
    );
  });
  console.log(matchingRecipes);
  new DisplayRecipes(matchingRecipes);
  new MainSearchbar(matchingRecipes);
};

filtersRecipe();

// const ingredientInput = document.querySelector(".ingredient-input");
// const allIngTags = document.querySelectorAll(".tagsIngredient");
// console.log([allIngTags]);
// ingredientInput.addEventListener("keyup", (e) => {
//   e.preventDefault();
//   const searchString = e.target.value.toLowerCase();
//   console.log(searchString);
//   const filteredTags = [allIngTags].filter((tag) => {
//     console.log(tag);
//     return tag.outertoLowerCase().includes(searchString);
//   });
//   console.log(filteredTags);
// });
