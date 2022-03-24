import data from "./data.js";
import { Recipe } from "./recipe.js";

class Main {
  constructor() {
    this.ingredientArray = [];
    this.appliancesArray = [];
    this.ustensilesArray = [];
    this.searchString = "";
    this.recipes = [];
    this.searchBar = document.getElementById("searchBar");
    data.forEach((oneRecipe) => {
      const recipe = new Recipe(oneRecipe);
      this.recipes.push(recipe);
    });
    this.displayRecipes(this.recipes);
    this.searchTag = { ingredient: "", appliance: "", ustensil: "" };
    this.extractTagsFromRecipes();
    this.displayTagsInDropdown();
    this.mainSearchBar();
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

  mainSearchBar() {
    this.searchBar.addEventListener("keyup", (e) => {
      e.preventDefault();
      console.log(this.recipes);
      this.searchString = e.target.value.toLowerCase();

      this.filtersRecipe();
    });
  }

  displayRecipes(recipes) {
    const recipesContainer = document.querySelector(".article-container");
    recipesContainer.innerHTML = "";
    recipes.forEach((recipe) => {
      const recipeCard = recipe.generateDomCard();
      recipesContainer.appendChild(recipeCard);
    });
  }

  addAndDeleteFilters(filterTag) {
    //ajout maj premiere lettre
    document
      .querySelectorAll(
        `.tags${filterTag.charAt(0).toUpperCase() + filterTag.slice(1)}`
      )
      .forEach((singleTag) => {
        const tagListContainer = document.querySelector(
          ".tagList-container-ingredient"
        );
        const tagId = singleTag.getAttribute("data-id");
        singleTag.addEventListener("click", (e) => {
          e.preventDefault();
          const tagHtml = document.createElement("li");
          tagHtml.classList.add("tagList-container-item");
          tagHtml.classList.add(`tagList-container-item-${filterTag}`);
          tagHtml.innerHTML = `${tagId}<span class="far fa-times-circle"></span>`;
          tagHtml.addEventListener("click", () => {
            this[`${filterTag}Array`] = this[`${filterTag}Array`].filter(
              (el) => el !== tagId
            );
            this.filtersRecipe();
            tagListContainer.removeChild(tagHtml);
          });

          tagListContainer.appendChild(tagHtml);
          this[`${filterTag}Array`].push(tagId);
          this.filtersRecipe();
        });
      });
  }

  filtersRecipe() {
    const matchingRecipes = this.recipes.filter((recipe) => {
      return recipe.isMatchingAllFilters(
        this.ingredientArray,
        this.appliancesArray,
        this.ustensilesArray,
        this.searchString
      );
    });
    console.log(this.ingredientArray);
    console.log(this.appliancesArray);
    console.log(this.ustensilesArray);
    console.log(matchingRecipes);
    this.displayRecipes(matchingRecipes);
  }

  //open the dropdown by clicking on the chevrons
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
    this.recipesElements = this.recipes.reduce(
      (total, cur) => {
        cur.ingredients.forEach((ing) => {
          if (!total.ingredients.includes(ing.ingredient)) {
            total.ingredients.sort(function (a, b) {
              return a === b ? 0 : a < b ? -1 : 1;
            });

            total.ingredients.push(ing.ingredient);
          }
        });
        if (!total.appliances.includes(cur.appliance)) {
          total.appliances.sort(function (a, b) {
            return a === b ? 0 : a < b ? -1 : 1;
          });
          total.appliances.push(cur.appliance);
        }
        cur.ustensils.forEach((el) => {
          if (!total.ustensiles.includes(el)) {
            total.ustensiles.sort(function (a, b) {
              return a === b ? 0 : a < b ? -1 : 1;
            });

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
    this.addAndDeleteFilters("ingredient");

    this.recipesElements.appliances
      .filter((app) =>
        app.toLowerCase().includes(this.searchTag.appliance.toLowerCase())
      )
      .forEach((appliance) => {
        const item = `<li class="tagsAppliances" data-id="${appliance}">${appliance}</li>`;
        appareilList.innerHTML += item;
      });
    this.addAndDeleteFilters("appliances");

    this.recipesElements.ustensiles
      .filter((ust) =>
        ust.toLowerCase().includes(this.searchTag.ustensil.toLowerCase())
      )
      .forEach((ustensil) => {
        const item = `<li class="tagsUstensiles" data-id="${ustensil}">${ustensil}</li>`;
        ustensilList.innerHTML += item;
      });

    this.addAndDeleteFilters("ustensiles");
  }
  tagSearch(e) {
    e.preventDefault();
    const type = e.target.getAttribute("data-type");
    this.searchTag[type] = e.target.value.toLowerCase();
    this.displayTagsInDropdown();
  }
}

new Main();
