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

  //4 parametre méthodes avec mainsearch, rajouter 3 array et faire fonctionner les filtres.

  isMatchingAllFilters(filteringredients, filterAppliances, filterUstensils) {
    return (
      this.isMatchingIngredient(filteringredients) &&
      this.isMatchingAppliance(filterAppliances) &&
      this.isMatchingUstensil(filterUstensils)
    );
  }
}
