import data from "./data.js";

export class ButtonListFactory {
  constructor(
    name, //???
    button, //btn à appeller dans le html
    listOfItems, //list à apeller dans le html
    nameOfClass, //???
    buttonForDisplay, // For opening not important
    inactiveContainerID // might not be important
  ) {
    this.name = name;
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];

    this.articlesArray = [...document.querySelectorAll(".recipe")];
    //CALL METHODS
    this.addTagstoDropDown(name);
    this.deleteDuplicateTags();
    console.log(this.allAppliances);
    console.log(this.allIngredients);
  }
  addTagstoDropDown(name) {
    if (name === "ingredients") {
    }
    if (name === "appliances") {
      data.forEach((appl) => {
        this.allAppliances.push(appl.appliance);
      });
    }
  }

  deleteDuplicateTags() {
    this.allIngredients = Array.from(new Set(this.allIngredients));
    this.allAppliances = Array.from(new Set(this.allAppliances));
    this.allUstensils = Array.from(new Set(this.allUstensils));
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
