// gallery item filter 

const filterButtons = document.querySelector("#filter__btn").children;
const items = document.querySelector(".project__gallery").children;


for (let i =0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function (){
    for (let j =0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active")
    }
    this.classList.add("active");
    const target = this.getAttribute("data-target")

    for (let k = 0; k < items.length; k++) {
      items[k].style.display = "none";
      if (target == items[k].getAttribute("data-id")) {
        items[k].style.display = "block";

      }
      if (target == "all") {
        items[k].style.display = "block";
      }
    }
  })
}