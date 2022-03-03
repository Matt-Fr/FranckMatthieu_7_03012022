export class AddAndDeleteFilters {
  constructor(allTagsCategory, type, array, launchFilterRecipe) {
    this.allTagsCategory = allTagsCategory;
    this.type = type;
    this.array = array;
    this.addAndDeleteFilter(launchFilterRecipe);
  }
  addAndDeleteFilter(launchFilterRecipe) {
    this.allTagsCategory.forEach((singleTag) => {
      const tagListContainer = document.querySelector(
        ".tagList-container-ingredient"
      );
      const tagId = singleTag.getAttribute("data-id");
      singleTag.addEventListener("click", (e) => {
        e.preventDefault();
        const tagHtml = document.createElement("li");
        tagHtml.classList.add("tagList-container-item");
        tagHtml.classList.add(`tagList-container-item-${this.type}`);
        tagHtml.innerHTML = `${tagId}<span class="far fa-times-circle"></span>`;
        tagHtml.addEventListener("click", () => {
          console.log(this.array);
          console.log(tagId);
          this.array = this.array.filter((el) => el !== tagId);
          console.log(this.array);
          launchFilterRecipe(this.array);
          tagListContainer.removeChild(tagHtml);
        });

        tagListContainer.appendChild(tagHtml);
        this.array.push(tagId);
        launchFilterRecipe(this.array);
      });
    });
  }
}
