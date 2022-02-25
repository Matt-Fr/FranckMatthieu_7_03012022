export class DisplayRecipes {
  constructor(data) {
    this.data = data;
    this.display();
  }

  display() {
    const data = this.data;
    const recipesContainer = document.querySelector(".article-container");

    const article = data
      .map((rec) => {
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
              ${rec.ingredients
                .map(
                  (ing) =>
                    `<span class="recipe-textContainer-description-ingredients-item">
                  ${ing.ingredient}: ${ing.quantity || ""} ${ing.unit || ""}
                </span>`
                )
                .join("")}
            
              </div>
              <p class="recipe-textContainer-description-prep">
                ${rec.description}
              </p>
            </div>
          </div>
        </article>`;
      })
      .join("");

    recipesContainer.innerHTML = article;
  }
}
