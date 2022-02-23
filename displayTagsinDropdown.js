import data from "./data.js";

// export class displayTagsInDropdown {
//   constructor(){

//   }
// }

export const displayTagsInDropdown = () => {
  const ingredientList = document.querySelector(".ingredient-list");
  const appareilList = document.querySelector(".appareil-list");
  const ustensilList = document.querySelector(".ustensiles-list");
  const recipesElements = data.reduce(
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

  recipesElements.ingredients.sort(function (a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });
  recipesElements.appliances.sort(function (a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });
  recipesElements.ustensiles.sort(function (a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });

  // //créer les éléments dans la liste
  const displayIngredients = () => {
    recipesElements.ingredients.forEach((ing) => {
      const item = `<li class="tagsIngredient" data-id="${ing}">${ing}</li>`;
      ingredientList.innerHTML += item;
    });
  };

  displayIngredients();

  //probablement les inclures dans des fonctions pour obtenir un filterustensiles en parametre

  recipesElements.appliances.forEach((appliance) => {
    const item = `<li class="tagsAppliances" data-id="${appliance}">${appliance}</li>`;
    appareilList.innerHTML += item;
  });

  recipesElements.ustensiles.forEach((ustensil) => {
    const item = `<li class="tagsUstensiles" data-id="${ustensil}">${ustensil}</li>`;
    ustensilList.innerHTML += item;
  });
};
