import { DropdownManager } from "./dropDown.js";
import recipes from "./data.js";

new DropdownManager();

class RecipesManager {
  constructor(recipesArr) {
    this.recipes = recipesArr;
    this.display();
  }

  display() {
    const RecipeArray = Array.from(this.recipes);
    const recipesContainer = document.querySelector(".article-container");

    const hello = RecipeArray.map((rec) => {
      return `<article class="recipe">
          <div class="recipe-imgContainer">
            <img src="" alt="" />
          </div>
          <div class="recipe-textContainer">
            <div class="recipe-textContainer-heading">
              <h2 class="recipe-textContainer-heading-title">
                ${rec.name}
              </h2>
              <div class="recipe-textContainer-heading-time">
                <i class="far fa-clock recipe-textContainer-heading-time-icon"></i>
                <span class="recipe-textContainer-heading-time-number">${
                  rec.time
                }</span>
              </div>
            </div>
            <div class="recipe-textContainer-description">
              <div class="recipe-textContainer-description-ingredients">
              ${rec.ingredients.map((ing) => ing.ingredient)}
                <span class="recipe-textContainer-description-ingredients-item">
                  coulis de tomate: 25cl
                </span>
                <span class="recipe-textContainer-description-ingredients-item">
                  coulis de tomate: 25cl
                </span>
                <span class="recipe-textContainer-description-ingredients-item">
                  coulis de tomate: 25cl
                </span>
                <span class="recipe-textContainer-description-ingredients-item">
                  coulis de tomate: 25cl
                </span>
                <span class="recipe-textContainer-description-ingredients-item">
                  coulis de tomate: 25cl
                </span>
                <span class="recipe-textContainer-description-ingredients-item">
                  coulis de tomate: 25cl
                </span>
              </div>
              <p class="recipe-textContainer-description-prep">
                ${rec.description}
              </p>
            </div>
          </div>
        </article>`;
    }).join("");

    recipesContainer.innerHTML = hello;
  }
  //   console.log(recipes);
  // //   displayRecipes(recipes) {
  // //     console.log(recipes);
  // //   }
}

new RecipesManager(recipes);
