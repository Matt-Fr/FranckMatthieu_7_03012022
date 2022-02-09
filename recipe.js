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

  exportApp() {
    const appliances = [];
    this.appliance.forEach((app) => {
      if (!appliances.includes(app)) {
        appliances.push(app);
      }
    });
    return appliances;
  }
}
