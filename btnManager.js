import data from "./data.js";

export class ButtonListFactory {
  constructor(
    name, //???
    button, //btn à appeller dans le html
    listOfTags, //list à apeller dans le html
    nameOfClass, //???
    buttonForDisplay, // For opening not important
    inactiveContainerID // might not be important
  ) {
    this.name = name;
    this.listOfTags = listOfTags;
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];

    this.articlesArray = [...document.querySelectorAll(".recipe")];
    //CALL METHODS
    this.addTagstoDropDown(name);
    this.deleteDuplicateTags();
    this.generateItemsListInDOM(this.allIngredients);
    this.generateItemsListInDOM(this.allAppliances);
    this.generateItemsListInDOM(this.allUstensils);
  }
  addTagstoDropDown(name) {
    if (name === "ingredients") {
    }
    if (name === "appliances") {
      data.forEach((appl) => {
        this.allAppliances.push(appl.appliance);
      });
    }
    if (name === "ustensils") {
      data.forEach((usten) => {
        this.allUstensils.push(usten.ustensils);
      });
    }
  }

  deleteDuplicateTags() {
    this.allIngredients = Array.from(new Set(this.allIngredients));
    this.allAppliances = Array.from(new Set(this.allAppliances));
    this.allUstensils = Array.from(new Set(this.allUstensils));
  }

  generateItemsListInDOM(array) {
    array.forEach((item) => {
      this.listOfTags.innerHTML += `
      <li>${item}</li>`;
    });
  }
}

// new ButtonListFactory(
//   "ingredient",
//   buttonIngredients,
//   listOfIngredients,
//   "ingredients",
//   buttonIngredientExpanded,
//   "container-1_active"
// );
