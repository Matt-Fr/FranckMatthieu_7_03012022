import { DropdownManager } from "./dropDown.js";
import data from "./data.js";
import { RecipesManager } from "./displayRecipes.js";
import { MainSearchbar } from "./mainSearchbar.js";
import { Recipe } from "./recipe.js";
import { displayTagsInDropdown } from "./displayTagsinDropdown.js";
import { AddAndDeleteFilters } from "./addAndDeletefilter.js";

new DropdownManager();

new RecipesManager(data);

new MainSearchbar();

displayTagsInDropdown();

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
  new RecipesManager(matchingRecipes);
};

filtersRecipe();
