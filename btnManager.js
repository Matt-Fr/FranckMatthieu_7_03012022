import data from "./data.js";

export class ButtonListFactory {
  constructor(name, listOfTags) {
    this.name = name;
    this.listOfTags = listOfTags;

    this.allElements = [];

    //CALL METHODS
    this.addTagstoDropDown();
    // this.deleteDuplicateTags();

    this.generateItemsListInDOM(this.allElements);
  }
  addTagstoDropDown() {
    const self = this;

    data.forEach((recipe) => {
      if (typeof recipe[self.name] === "string") {
        if (!self.allElements.includes(recipe[self.name])) {
          self.allElements.push(recipe[self.name]);
        }
      } else {
        recipe[self.name].forEach((el) => {
          if (!self.allElements.includes(el)) {
            self.allElements.push(el);
          }
        });
      }
    });
  }

  generateItemsListInDOM(array) {
    array.forEach((item) => {
      this.listOfTags.innerHTML += `
      <li>${typeof item === "object" ? item.ingredient : item}</li>`;
    });
  }
}
