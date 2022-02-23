import { DropdownManager } from "./dropDown.js";
import data from "./data.js";
import { RecipesManager } from "./displayRecipes.js";
import { MainSearchbar } from "./mainSearchbar.js";
import { Recipe } from "./recipe.js";
import { displayTagsInDropdown } from "./displayTagsinDropdown.js";

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

const tagListContainer = document.querySelector(
  ".tagList-container-ingredient"
);

const addAndDeleteFilter = (allTagsCategory, type, array) =>
  allTagsCategory.forEach((singleTag) => {
    const tagId = singleTag.getAttribute("data-id");
    singleTag.addEventListener("click", (e) => {
      e.preventDefault();
      const tagHtml = document.createElement("li");
      tagHtml.classList.add("tagList-container-item");
      tagHtml.classList.add(`tagList-container-item-${type}`);
      tagHtml.innerHTML = `${tagId}<span class="far fa-times-circle"></span>`;
      tagHtml.addEventListener("click", () => {
        array = array.filter((el) => el !== tagId);
        filtersRecipe();
        tagListContainer.removeChild(tagHtml);
      });

      tagListContainer.appendChild(tagHtml);
      array.push(tagId);
      filtersRecipe();
    });
  });

addAndDeleteFilter(allTagsIngredients, "ingredient", ingredientFilter);
addAndDeleteFilter(allTagsAppliances, "appliance", applianceFilter);
addAndDeleteFilter(allTagsUstensiles, "ustensile", ustensileFilter);

const recipes = [];

data.forEach((oneRecipe) => {
  const recipe = new Recipe(oneRecipe);
  recipes.push(recipe);
});

const filtersRecipe = () => {
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
