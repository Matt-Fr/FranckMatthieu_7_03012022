export class Recipe {
  constructor(
    data = {
      id: null,
      ingredients: [],
      name: "",
      time: null,
      servings: null,
      appliance: "",
      ustensils: "",
    }
  ) {
    this.name = data?.name || "";
    this.id = data.id;
    this.appliance = data?.appliance || "";
    this.time = data.time;
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

  isMatchingIngredient(ingredients) {
    let isMatchingIngredient = true;
    // for (let index = 0; index < ingredients.length; index++) {
    //   const ing = ingredients[index];
    //   isMatchingIngredient =
    //     !!this.ingredients.find(
    //       (i) => i.ingredient.toLowerCase() === ing.toLowerCase()
    //     ) && isMatchingIngredient;
    // }
    ingredients.forEach((ing) => {
      // console.log(this.ingredients.map((i) => i.ingredient.toLowerCase()));
      // console.log(ing.toLowerCase());
      isMatchingIngredient =
        !!this.ingredients.find(
          (i) => i.ingredient.toLowerCase() === ing.toLowerCase()
        ) && isMatchingIngredient;
    });

    return isMatchingIngredient;
  }

  isMatchingAllFilters(ingredients) {
    return this.isMatchingIngredient(ingredients);
  }
}
