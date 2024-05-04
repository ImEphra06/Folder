const ctx = {
	ingredients: [],
	appliances: [],
	ustensils: []
};

function setupDropdown (item) {
  document.getElementById(item + "Btn").addEventListener("click", () => {
    if(document.querySelector(".dropdown-content-" + item).style.display === "block"){
      closeList(item);
    } else{
      openList(item);
    }
  });
}

function openList(label) {
  const container = document.querySelector("." + label);
  const btn = document.getElementById(label + "Btn");
  const list = document.querySelector(".dropdown-content-" + label);

  list.style.display = list.style.display = "block";
  container.classList.remove("filter-close");
	btn.querySelector(".filterArrow").classList.add("rotate-180");
}

function closeList(label) {
  const container = document.querySelector("." + label);
  const btn = document.getElementById(label + "Btn");
  const list = document.querySelector(".dropdown-content-" + label);

  list.style.display = list.style.display = "none";
  container.classList.add("filter-close");
	btn.querySelector(".filterArrow").classList.remove("rotate-180");
}

function initEvent() {
  setupDropdown ("ingredients");
  setupDropdown ("appliances");
  setupDropdown ("ustensils");
}

window.addEventListener("load", async() => {
  initEvent();
  initReferences();
  await getRecipes();
  filterRecipes();
});