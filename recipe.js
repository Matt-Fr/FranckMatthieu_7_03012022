import recipeTmpl from "./recipeTmpl.js";

export class Recipe {
  constructor(
    data = {
      id: null,
      ingredients: [],
      name: "",
      time: null,
      description: "",
      servings: null,
      appliance: "",
      ustensils: "",
    }
  ) {
    this.name = data?.name || "";
    this.id = data.id;
    this.appliance = data?.appliance || "";
    this.time = data.time;
    this.description = data?.description || "";
    this.servings = data.servings;
    this.ingredients = data?.ingredients || [];
    this.ustensils = data?.ustensils || [];
  }

  isMatchingIngredient(filteringredients) {
    let isMatchingIngredient = true;

    if (filteringredients && filteringredients.length) {
      filteringredients.forEach((ing) => {
        isMatchingIngredient =
          !!this.ingredients.find(
            (i) => i.ingredient.toLowerCase() === ing.toLowerCase()
          ) && isMatchingIngredient;
      });
    }

    return isMatchingIngredient;
  }

  isMatchingAppliance(filterAppliances) {
    let isMatchingAppliance = true;
    if (filterAppliances && filterAppliances.length) {
      filterAppliances.forEach((app) => {
        isMatchingAppliance =
          this.appliance.toLowerCase() === app.toLowerCase() &&
          isMatchingAppliance;
      });
    }

    return isMatchingAppliance;
  }

  isMatchingUstensil(filterUstensils) {
    let isMatchingUstensil = true;
    if (filterUstensils && filterUstensils.length) {
      filterUstensils.forEach((ustensil) => {
        isMatchingUstensil =
          !!this.ustensils.find(
            (u) => u.toLowerCase() === ustensil.toLowerCase()
          ) && isMatchingUstensil;
      });
    }

    return isMatchingUstensil;
  }

  isMatchingSearch(searchString) {
    const searchLowerC = searchString.toLowerCase();
    const isMatchingIngredient = this.ingredients.find((ing) =>
      ing.ingredient.toLowerCase().includes(searchString.toLowerCase())
    );
    const isMatchingtitle = this.name.toLowerCase().includes(searchLowerC);
    const isMatchingAppliance = this.appliance
      .toLowerCase()
      .includes(searchLowerC);
    const isMatchingUstensil = this.ustensils.find((ust) =>
      ust.toLowerCase().includes(searchLowerC)
    );

    return (
      isMatchingAppliance ||
      isMatchingIngredient ||
      isMatchingtitle ||
      isMatchingUstensil
    );
  }

  isMatchingAllFilters(
    filteringredients,
    filterAppliances,
    filterUstensils,
    filterSearch
  ) {
    return (
      this.isMatchingIngredient(filteringredients) &&
      this.isMatchingAppliance(filterAppliances) &&
      this.isMatchingUstensil(filterUstensils) &&
      this.isMatchingSearch(filterSearch)
    );
  }

  generateDomCard() {
    const article = document.createElement("article");
    article.classList.add("recipe");
    article.innerHTML = recipeTmpl;
    article.querySelector(".recipe-textContainer-heading-title").innerHTML =
      this.name;
    article.querySelector(
      ".recipe-textContainer-heading-time-number"
    ).innerHTML = this.time;
    this.ingredients.forEach((ing) => {
      const ingredient = document.createElement("span");
      ingredient.classList.add(
        "recipe-textContainer-description-ingredients-item"
      );
      ingredient.innerHTML = `${ing.ingredient}: ${ing.quantity || ""} ${
        ing.unit || ""
      }`;
      article.querySelector(
        ".recipe-textContainer-description-prep"
      ).innerHTML = this.description;
      article
        .querySelector(".recipe-textContainer-description-ingredients")
        .appendChild(ingredient);
    });
    return article;
  }
}
