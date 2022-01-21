export class DropdownManager {
  constructor() {
    this.lists = document.querySelectorAll(".list");
    this.listBtn = document.querySelectorAll(".researchFields-form-btn");
    this.forms = document.querySelectorAll(".researchFields-form");
    this.chevrons = document.querySelectorAll(".chevron");
    this.listBtn.forEach((btn) => {
      btn.addEventListener("click", this.chevronClick.bind(this));
    });
  }
  chevronClick(e) {
    this.chevrons.forEach((item) => {
      item.classList.remove("rotate");
    });
    const list = e.currentTarget.nextElementSibling;
    const chevron = e.currentTarget.children[0];
    this.lists.forEach((item) => {
      if (item !== list) {
        item.classList.remove("open");
      }
    });

    list.classList.toggle("open");

    chevron.classList.add("rotate");
  }
}
