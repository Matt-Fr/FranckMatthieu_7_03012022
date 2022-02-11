import { DropdownManager } from "./dropDown.js";
import data from "./data.js";
import { RecipesManager } from "./displayRecipes.js";
import { MainSearchbar } from "./mainSearchbar.js";
import { ButtonListFactory } from "./btnManager.js";
import { Recipe } from "./recipe.js";

const ingredientList = document.querySelector(".ingredient-list");
const appareilList = document.querySelector(".appareil-list");
const ustensilList = document.querySelector(".ustensiles-list");

new DropdownManager();

new RecipesManager(data);

new MainSearchbar();

// new ButtonListFactory("ingredients", ingredientList);
// new ButtonListFactory("appliance", appareilList);
// new ButtonListFactory("ustensils", ustensilList);

const recipes = [];
const ingredients = [];
const appliances = [];
const ustensiles = [];

data.forEach((oneRecipe) => {
  const recipe = new Recipe(oneRecipe);

  //   recipes.push(recipe); a voir plus tard pour le filtre
  //on applique exportIng à recipe (=toutes les recettes en objet)
  recipe.exportIng().forEach((ing) => {
    if (!ingredients.includes(ing)) {
      ingredients.push(ing);
    }
  });
});

//trier le tableau
ingredients.sort(function (a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
});

//créer les éléments dans la liste
const displayIngredients = (allIngredient) => {
  allIngredient.forEach((ing) => {
    const item = `<li class="tagsIngredient" id=${ing}>${ing}</li>`;
    ingredientList.innerHTML += item;
  });
};

displayIngredients(ingredients);

data.forEach((oneRecipe) => {
  const recipe2 = new Recipe(oneRecipe);
  if (!appliances.includes(recipe2.appliance)) {
    appliances.push(recipe2.appliance);
  }
});

appliances.sort(function (a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
});

appliances.forEach((appliance) => {
  const item = `<li>${appliance}</li>`;
  appareilList.innerHTML += item;
});

data.forEach((oneRecipe) => {
  const recipe3 = new Recipe(oneRecipe);
  recipe3.ustensils.forEach((ustensil) => {
    if (!ustensiles.includes(ustensil)) {
      ustensiles.push(ustensil);
    }
  });
});

ustensiles.sort(function (a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
});

ustensiles.forEach((ustensil) => {
  const item = `<li>${ustensil}</li>`;
  ustensilList.innerHTML += item;
});

const allTagsIngredients = document.querySelectorAll(".tagsIngredient");
const filterArray = [];
const tagsIngredient = document.querySelectorAll(".tagList-container-item");

const tagListIngredientContainer = document.querySelector(
  ".tagList-container-ingredient"
);

allTagsIngredients.forEach((singleTag) => {
  singleTag.addEventListener("click", (e) => {
    e.preventDefault();

    tagListIngredientContainer.innerHTML += `<li class="tagList-container-item tagList-container-item-ingredient">
        ${singleTag.id}<span class="far fa-times-circle"></span>
      </li>`;
    filterArray.push(singleTag.id);
    console.log(filterArray);
  });
});

//ne marche pas pour les nouveaux tags
function removeTags() {
  tagsIngredient.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      tag.style.display = "none";
    });
  });
}
removeTags();

// const searchbarIngredient = () => {
//   const searchbar = document.querySelector(".ingredient-input");
//   console.log(searchbar);
//   searchbar.addEventListener("keyup", (e) => {
//     e.preventDefault();
//     const searchString = e.target.value.toLowerCase();
//     console.log(searchString);
//     const filteredIng = ingredients.filter((ingredient) => {
//       return ingredient.toLowerCase().includes(searchString);
//     });
//     displayIngredients(filteredIng);
//   });
// };

// searchbarIngredient();

// export class MainSearchbar {
//   constructor() {
//     let listRecipe = data;
//     this.searchBar = document.getElementById("searchBar");
//     searchBar.addEventListener("keyup", (e) => {
//       e.preventDefault();
//       const searchString = e.target.value.toLowerCase();
//       console.log(searchString);
//       const filteredRecipes = listRecipe.filter((recipe) => {
//         return (
//           recipe.name.toLowerCase().includes(searchString) ||
//           recipe.appliance.toLowerCase().includes(searchString) ||
//           recipe.ingredients.find((el) =>
//             el.ingredient.toLowerCase().includes(searchString)
//           )
//         );
//       });
//       new RecipesManager(filteredRecipes);
//     });
//   }
// }

data.forEach((oneRecipe) => {
  const recipe = new Recipe(oneRecipe);

  recipes.push(recipe);
});
console.log(recipes);

const filtersRecipe = () => {
  const filters = filterArray;
  console.log(filters);
  const matchingRecipes = recipes.filter((recipe) => {
    recipe.isMatchingAllFilters(filters);
  });
  console.log(matchingRecipes);
};

filtersRecipe();
