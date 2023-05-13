// Get the button and the dropdown list
const statusButton = document.getElementById("statusButton");
const statusList = document.getElementById("statusList");
const form = document.getElementById("statusForm")

// Set the default value and background color
let selectedOption = "active";
statusButton.style.backgroundColor = "orange";

// Listen for clicks on the button
statusButton.addEventListener("click", function() {
  // Toggle the dropdown list
  statusList.classList.toggle("hidden");
});

const statusItems = document.querySelectorAll("#statusList li")
statusItems.forEach(item => {
  item.addEventListener("click", function() {
    const status = this.getAttribute("data-value")

    // Changing the status value 
    document.getElementById("statusInput").value = status

    form.submit()

  })
})

// Listen for clicks on the dropdown list options
statusList.addEventListener("click", function(event) {
  // Get the selected option value and update the button text
  selectedOption = event.target.getAttribute("data-value");
  statusButton.textContent = selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1);
  
  // Change the background color based on the selected option
  if (selectedOption === "Active") {
    statusButton.style.backgroundColor = "orange";
  } else if (selectedOption === "Delivered") {
    statusButton.style.backgroundColor = "green";
  } else if (selectedOption === "Cancelled") {
    statusButton.style.backgroundColor = "red";
  }
  // Hide the dropdown list
  statusList.classList.add("hidden");
});

