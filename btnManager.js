import data from "./data.js";

export class ButtonListFactory {
  constructor(name, listOfTags) {
    this.name = name;
    this.listOfTags = listOfTags;
    // this.allIngredients = [];
    // this.allAppliances = [];
    // this.allUstensils = [];
    this.allElements = [];

    //CALL METHODS
    this.addTagstoDropDown();
    // this.deleteDuplicateTags();

    this.generateItemsListInDOM(this.allElements);
    // this.generateItemsListInDOM(this.allIngredients);
    // this.generateItemsListInDOM(this.allAppliances);
    // this.generateItemsListInDOM(this.allUstensils);

    console.log(this.allElements);
  }
  addTagstoDropDown() {
    const self = this;
    data.forEach((recipe) => {
      if (typeof recipe[self.name] === "string") {
        if (!self.allElements.includes(recipe[self.name])) {
          self.allElements.push(recipe[self.name]);
        }
      } else {
        console.log(self.name);
        recipe[self.name].forEach((el) => {
          if (!self.allElements.includes(el)) {
            self.allElements.push(el);
          }
        });
      }
    });

    // if (name === "ingredients") {
    //   data.forEach((ing) => {
    //     this.allIngredients.push(ing.ingredients);
    //   });
    // }
    // if (name === "appliances") {
    //   data.forEach((appl) => {
    //     this.allAppliances.push(appl.appliance);
    //   });
    // }
    // if (name === "ustensils") {
    //   data.forEach((usten) => {
    //     this.allUstensils.push(usten.ustensils);
    //   });
    // }
  }

  deleteDuplicateTags() {
    this.allIngredients = Array.from(new Set(this.allIngredients));
    this.allAppliances = Array.from(new Set(this.allAppliances));
    this.allUstensils = Array.from(new Set(this.allUstensils));
  }

  generateItemsListInDOM(array) {
    array.forEach((item) => {
      this.listOfTags.innerHTML += `
      <li>${typeof item === "object" ? item.ingredient : item}</li>`;
    });
  }
}
