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
  exportIng() {
    const ingredients = [];

    this.ingredients.forEach(({ ingredient }) => {
      if (!ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
      }
    });

    return ingredients;
  }

  isMatchingIngredient(filteringredients) {
    let isMatchingIngredient = true;

    filteringredients.forEach((ing) => {
      isMatchingIngredient =
        !!this.ingredients.find(
          (i) => i.ingredient.toLowerCase() === ing.toLowerCase()
        ) && isMatchingIngredient;
    });

    return isMatchingIngredient;
  }

  isMatchingAppliance(filterAppliances) {
    let isMatchingAppliance = true;

    filterAppliances.forEach((app) => {
      !!this.appliance.find((a) => {
        a.toLowerCase() === app.toLowerCase();
      }) && isMatchingAppliance;
    });

    return isMatchingAppliance;
  }

  isMatchingUstensil(filterUstensils) {
    let isMatchingUstensil = true;
    filterUstensils.forEach((ustensil) => {
      isMatchingUstensil =
        !!this.ustensils.find((u) => {
          u.toLowerCase() === ustensil.toLowerCase();
        }) && isMatchingUstensil;
    });
    return isMatchingUstensil;
  }

  isMatchingAllFilters(filterElements) {
    return this.isMatchingIngredient(filterElements);
    // &&
    // this.isMatchingUstensil(filterElements)
  }
}
