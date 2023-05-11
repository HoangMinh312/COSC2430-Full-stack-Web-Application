const dropdownButton = document.getElementById("dropdown-button");
const dropdownMenu = document.getElementById("dropdown-menu");

dropdownMenu.addEventListener("click", function(event) {
    if (event.target.dataset.value) {
      dropdownButton.textContent = event.target.dataset.value;
      dropdownMenu.classList.add("hidden");
    }
});

dropdownButton.addEventListener("click", function() {
    dropdownMenu.classList.toggle("hidden");
});