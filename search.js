const search = document.querySelector(".search-input");
const searchForm = document.getElementById("search-form");

function getInput() {
  return search.value;
}

function openInNewTab(query) {
  let url = `http://www.google.com/search?q=${query}`;
  var win = window.open(url, "_blank");
  win.focus();
}

function clearInput() {
  search.value = "";
}

function searchInit() {
  const query = getInput();
  openInNewTab(query);
  clearInput();
}

window.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && event.target === search && search.value !== "") {
    searchInit();
    event.preventDefault();
  }
});
