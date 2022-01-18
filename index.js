const lists = document.querySelectorAll(".list");

const listBtn = document.querySelectorAll(".researchFields-form-btn");

const forms = document.querySelectorAll(".researchFields-form");

const chevrons = document.querySelectorAll(".chevron");

listBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    chevrons.forEach((item) => {
      item.classList.remove("rotate");
    });
    lists.forEach((item) => {
      item.classList.remove("open");
    });
    const list = e.currentTarget.nextElementSibling;
    const chevron = e.currentTarget.children[0];

    // if (list.classList.contains("open")) {
    //   list.classList.remove("open");
    // } else {
    //   list.classList.add("open");
    // }

    list.classList.toggle("open");

    chevron.classList.add("rotate");
  });
});
