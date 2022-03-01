import { DropdownManager } from "./dropDown.js";
import data from "./data.js";
import { DisplayRecipes } from "./displayRecipes.js";
import { MainSearchbar } from "./mainSearchbar.js";
import { Recipe } from "./recipe.js";
import { AddAndDeleteFilters } from "./addAndDeletefilter.js";

//créer template, voir jsfiddle, inclure les class dans le main, faire ust avec datatype, comprendre le bind this

class Main {
  constructor() {
    this.searchTag = { ingredient: "", appliance: "", ustensil: "" };
    this.extractTagsFromRecipes();
    this.displayTagsInDropdown();
    const ingredientInput = document.querySelector(".ingredient-input");
    const applianceInput = document.querySelector(".appareil-input");
    const ustensilInput = document.querySelector(".ustensiles-input");
    ingredientInput.addEventListener("keyup", this.tagSearch.bind(this));
    applianceInput.addEventListener("keyup", this.tagSearch.bind(this));
    ustensilInput.addEventListener("keyup", this.tagSearch.bind(this));
    this.lists = document.querySelectorAll(".list");
    this.listBtn = document.querySelectorAll(".researchFields-form-btn");
    this.forms = document.querySelectorAll(".researchFields-form");
    this.chevrons = document.querySelectorAll(".chevron");
    this.listBtn.forEach((btn) => {
      btn.addEventListener("click", this.chevronClick.bind(this));
    });
  }

  chevronClick(e) {
    const list = e.currentTarget.nextElementSibling;
    const chevron = e.currentTarget.children[0];

    this.chevrons.forEach((item) => {
      if (item !== chevron) {
        item.classList.remove("rotate");
      }
    });

    this.lists.forEach((item) => {
      if (item !== list) {
        item.classList.remove("open");
      }
    });

    chevron.classList.toggle("rotate");
    list.classList.toggle("open");
  }

  extractTagsFromRecipes() {
    this.recipesElements = data.reduce(
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
  }
  displayTagsInDropdown() {
    const ingredientList = document.querySelector(".ingredient-list");
    const appareilList = document.querySelector(".appareil-list");
    const ustensilList = document.querySelector(".ustensiles-list");

    ingredientList.innerHTML = "";
    appareilList.innerHTML = "";
    ustensilList.innerHTML = "";

    this.recipesElements.ingredients
      .filter((ing) =>
        ing.toLowerCase().includes(this.searchTag.ingredient.toLowerCase())
      )
      .forEach((ing) => {
        const item = `<li class="tagsIngredient" data-id="${ing}">${ing}</li>`;
        ingredientList.innerHTML += item;
      });

    this.recipesElements.appliances
      .filter((app) =>
        app.toLowerCase().includes(this.searchTag.appliance.toLowerCase())
      )
      .forEach((appliance) => {
        const item = `<li class="tagsAppliances" data-id="${appliance}">${appliance}</li>`;
        appareilList.innerHTML += item;
      });

    this.recipesElements.ustensiles
      .filter((ust) =>
        ust.toLowerCase().includes(this.searchTag.ustensil.toLowerCase())
      )
      .forEach((ustensil) => {
        const item = `<li class="tagsUstensiles" data-id="${ustensil}">${ustensil}</li>`;
        ustensilList.innerHTML += item;
      });
  }
  tagSearch(e) {
    e.preventDefault();
    const type = e.target.getAttribute("data-type");
    this.searchTag[type] = e.target.value.toLowerCase();
    this.displayTagsInDropdown();
  }
}

new Main();

new DisplayRecipes(data);

const allTagsIngredients = document.querySelectorAll(".tagsIngredient");
const allTagsAppliances = document.querySelectorAll(".tagsAppliances");
const allTagsUstensiles = document.querySelectorAll(".tagsUstensiles");
let ingredientFilter = [];
let applianceFilter = [];
let ustensileFilter = [];

new AddAndDeleteFilters(
  allTagsIngredients,
  "ingredient",
  ingredientFilter,
  (filterArray) => {
    ingredientFilter = filterArray;
    console.log(filterArray);
    filtersRecipe(ingredientFilter, applianceFilter, ustensileFilter);
  }
);
new AddAndDeleteFilters(
  allTagsAppliances,
  "appliance",
  applianceFilter,
  (filterArray) => {
    applianceFilter = filterArray;
    filtersRecipe(ingredientFilter, applianceFilter, ustensileFilter);
  }
);
new AddAndDeleteFilters(
  allTagsUstensiles,
  "ustensile",
  ustensileFilter,
  (filterArray) => {
    ustensileFilter = filterArray;
    filtersRecipe(ingredientFilter, applianceFilter, ustensileFilter);
  }
);

const recipes = [];

data.forEach((oneRecipe) => {
  const recipe = new Recipe(oneRecipe);
  recipes.push(recipe);
});

export const filtersRecipe = (
  ingredientFilter,
  applianceFilter,
  ustensileFilter
) => {
  console.log(ingredientFilter);
  console.log(applianceFilter);
  console.log(ustensileFilter);
  // à modifier filter pour seconde branche
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
