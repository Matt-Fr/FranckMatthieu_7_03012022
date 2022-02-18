import { DropdownManager } from "./dropDown.js";
import data from "./data.js";
import { RecipesManager } from "./displayRecipes.js";
import { MainSearchbar } from "./mainSearchbar.js";
import { ButtonListFactory } from "./btnManager.js";
import { Recipe } from "./recipe.js";

const ingredientList = document.querySelector(".ingredient-list");
const appareilList = document.querySelector(".appareil-list");
const ustensilList = document.querySelector(".ustensiles-list");

new DropdownManager();

new RecipesManager(data);

new MainSearchbar();

// new ButtonListFactory("ingredients", ingredientList);
// new ButtonListFactory("appliance", appareilList);
// new ButtonListFactory("ustensils", ustensilList);

const recipes = [];
const ingredients = [];
const appliances = [];
const ustensiles = [];

const recipesElements = data.reduce(
  (total, cur) => {
    cur.ingredients.forEach((ing) => {
      if (!total.ingredients.includes(ing.ingredient)) {
        total.ingredients.push(ing.ingredient);
      }
    });
    if (!total.appliances.includes(cur.appliance))
      total.appliances.push(cur.appliance);
    cur.ustensils.forEach((el) => {
      if (!total.ustensiles.includes(el)) {
        total.ustensiles.push(el);
      }
    });

    return total;
  },
  { ingredients: [], appliances: [], ustensiles: [] }
);

recipesElements.ingredients.sort(function (a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
});
recipesElements.appliances.sort(function (a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
});
recipesElements.ustensiles.sort(function (a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
});

// //créer les éléments dans la liste
const displayIngredients = () => {
  recipesElements.ingredients.forEach((ing) => {
    const item = `<li class="tagsIngredient" data-id="${ing}">${ing}</li>`;
    ingredientList.innerHTML += item;
  });
};

displayIngredients();

//probablement les inclures dans des fonctions pour obtenir un filterustensiles en parametre

recipesElements.appliances.forEach((appliance) => {
  const item = `<li class="tagsAppliances" data-id="${appliance}">${appliance}</li>`;
  appareilList.innerHTML += item;
});

recipesElements.ustensiles.forEach((ustensil) => {
  const item = `<li class="tagsUstensiles" data-id="${ustensil}">${ustensil}</li>`;
  ustensilList.innerHTML += item;
});

const allTagsIngredients = document.querySelectorAll(".tagsIngredient");
const allTagsAppliances = document.querySelectorAll(".tagsAppliances");
const allTagsUstensiles = document.querySelectorAll(".tagsUstensiles");
let filterArray = [];
const tagsIngredient = document.querySelectorAll(".tagList-container-item");

const tagListIngredientContainer = document.querySelector(
  ".tagList-container-ingredient"
);

const tagListApplianceContainer = document.querySelector(
  ".tagList-container-appliance"
);

const tagListUstensilContainer = document.querySelector(
  ".tagList-container-ustensile"
);

const addAndDeleteFilter = (allTagsCategory, type) =>
  allTagsCategory.forEach((singleTag) => {
    const tagId = singleTag.getAttribute("data-id");
    singleTag.addEventListener("click", (e) => {
      e.preventDefault();
      const tagHtml = document.createElement("li");
      tagHtml.classList.add("tagList-container-item");
      tagHtml.classList.add(`tagList-container-item-${type}`);
      tagHtml.innerHTML = `${tagId}<span class="far fa-times-circle"></span>`;
      tagHtml.addEventListener("click", (e) => {
        filterArray = filterArray.filter((ing) => ing !== tagId);
        // console.log(filterArray);
        filtersRecipe();
        tagListIngredientContainer.removeChild(tagHtml);
      });

      tagListIngredientContainer.appendChild(tagHtml);
      filterArray.push(tagId);
      filtersRecipe();
      // console.log(filterArray);
    });
  });

addAndDeleteFilter(allTagsIngredients, "ingredient");
addAndDeleteFilter(allTagsAppliances, "appliance");
addAndDeleteFilter(allTagsUstensiles, "ustensile");

data.forEach((oneRecipe) => {
  const recipe = new Recipe(oneRecipe);

  recipes.push(recipe);
});
// console.log(recipes);

const filtersRecipe = () => {
  const filters = filterArray;
  console.log(filters);
  const matchingRecipes = recipes.filter((recipe) => {
    return recipe.isMatchingAllFilters(filters);
  });
  console.log(matchingRecipes);
  new RecipesManager(matchingRecipes);
};

filtersRecipe();
