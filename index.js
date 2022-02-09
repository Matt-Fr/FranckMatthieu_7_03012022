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

data.forEach((oneRecipe) => {
  const recipe = new Recipe(oneRecipe);

  //   recipes.push(recipe); a voir plus tard pour le filtre
  //on applique exportIng à recipe (=toutes les recettes en objet)
  recipe.exportIng().forEach((ing) => {
    if (!ingredients.includes(ing)) {
      ingredients.push(ing);
    }
  });
});

//trier le tableau
ingredients.sort(function (a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
});

ingredients.forEach((ing) => {
  const item = `<li>${ing}</li>`;
  ingredientList.innerHTML += item;
});

data.forEach((oneRecipe) => {
  const recipe2 = new Recipe(oneRecipe);
  if (!appliances.includes(recipe2.appliance)) {
    appliances.push(recipe2.appliance);
  }
});

appliances.sort(function (a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
});

appliances.forEach((appliance) => {
  const item = `<li>${appliance}</li>`;
  appareilList.innerHTML += item;
});

data.forEach((oneRecipe) => {
  const recipe3 = new Recipe(oneRecipe);
  recipe3.ustensils.forEach((ustensil) => {
    if (!ustensiles.includes(ustensil)) {
      ustensiles.push(ustensil);
    }
  });
});

ustensiles.sort(function (a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
});

ustensiles.forEach((ustensil) => {
  const item = `<li>${ustensil}</li>`;
  ustensilList.innerHTML += item;
});
