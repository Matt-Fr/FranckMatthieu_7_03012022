import recipeTmpl from "./recipeTmpl.js";

export class Recipe {
  constructor(data = {}) {
    const {
      id = null,
      ingredients = [],
      name = "",
      time = null,
      description = "",
      servings = null,
      appliance = "",
      ustensils = "",
      photoLink = "",
    } = data;

    this.name = name;
    this.id = id;
    this.appliance = appliance;
    this.time = time;
    this.description = description;
    this.servings = servings;
    this.ingredients = ingredients;
    this.ustensils = ustensils;
    this.photoLink = photoLink;
  }

  // Check if the recipe matches the specified ingredient filters
  isMatchingIngredient(filterIngredients) {
    if (!filterIngredients || filterIngredients.length === 0) {
      return true;
    }

    // Check if all filter ingredients are found in the recipe's ingredients
    return filterIngredients.every((ing) =>
      this.ingredients.some(
        (i) => i.ingredient.toLowerCase() === ing.toLowerCase()
      )
    );
  }

  // Check if the recipe matches the specified appliance filters
  isMatchingAppliance(filterAppliances) {
    if (!filterAppliances || filterAppliances.length === 0) {
      return true;
    }

    // Check if any filter appliance matches the recipe's appliance
    return filterAppliances.some(
      (app) => this.appliance.toLowerCase() === app.toLowerCase()
    );
  }

  // Check if the recipe matches the specified ustensil filters
  isMatchingUstensil(filterUstensils) {
    if (!filterUstensils || filterUstensils.length === 0) {
      return true;
    }

    // Check if all filter ustensils are found in the recipe's ustensils
    return filterUstensils.every((ustensil) =>
      this.ustensils.some((u) => u.toLowerCase() === ustensil.toLowerCase())
    );
  }

  // Check if the recipe matches the specified search string
  isMatchingSearch(searchString) {
    const searchLowerC = searchString.toLowerCase();
    const isMatchingIngredient = this.ingredients.some((ing) =>
      ing.ingredient.toLowerCase().includes(searchLowerC)
    );
    const isMatchingTitle = this.name.toLowerCase().includes(searchLowerC);
    const isMatchingAppliance = this.appliance
      .toLowerCase()
      .includes(searchLowerC);
    const isMatchingUstensil = this.ustensils.some((ust) =>
      ust.toLowerCase().includes(searchLowerC)
    );

    return (
      isMatchingAppliance ||
      isMatchingIngredient ||
      isMatchingTitle ||
      isMatchingUstensil
    );
  }

  // Check if the recipe matches all specified filters
  isMatchingAllFilters(
    filterIngredients,
    filterAppliances,
    filterUstensils,
    filterSearch
  ) {
    return (
      this.isMatchingIngredient(filterIngredients) &&
      this.isMatchingAppliance(filterAppliances) &&
      this.isMatchingUstensil(filterUstensils) &&
      this.isMatchingSearch(filterSearch)
    );
  }

  // Generate the DOM card for the recipe
  generateDomCard() {
    const article = document.createElement("article");
    article.classList.add("recipe");
    article.innerHTML = recipeTmpl;
    article.querySelector(".recipe-textContainer-heading-title").innerHTML =
      this.name;
    article.querySelector(
      ".recipe-textContainer-heading-time-number"
    ).innerHTML = this.time;

    const imgElement = article.querySelector(".recipe-imgContainer-img");
    imgElement.src = this.photoLink;

    // Add each ingredient to the recipe card
    this.ingredients.forEach((ing) => {
      const ingredient = document.createElement("span");
      ingredient.classList.add(
        "recipe-textContainer-description-ingredients-item"
      );
      ingredient.innerHTML = `${ing.ingredient}: ${ing.quantity || ""} ${
        ing.unit || ""
      }`;
      article
        .querySelector(".recipe-textContainer-description-ingredients")
        .appendChild(ingredient);
    });

    // Set the recipe description
    article.querySelector(".recipe-textContainer-description-prep").innerHTML =
      this.description;

    return article;
  }
}
