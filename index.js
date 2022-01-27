import { DropdownManager } from "./dropDown.js";
import data from "./data.js";
import { RecipesManager } from "./displayRecipes.js";
import { MainSearchbar } from "./mainSearchbar.js";
import { ButtonListFactory } from "./btnManager.js";

const ingredientList = document.querySelector(".ingredient-list");
const appareilList = document.querySelector(".appareil-list");
const ustensilList = document.querySelector(".ustensiles-list");

new DropdownManager();

new RecipesManager(data);

new MainSearchbar();

new ButtonListFactory("ingredients", ingredientList);
new ButtonListFactory("appliances", appareilList);
new ButtonListFactory("ustensils", ustensilList);
