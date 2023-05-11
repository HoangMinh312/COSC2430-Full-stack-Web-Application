const dropdownButton = document.getElementById('dropdown-button');
const dropdownMenu = document.getElementById('dropdown-menu');

dropdownButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden');
});

dropdownMenu.addEventListener('click', (event) => {
  const selectedOption = event.target.getAttribute('data-value');
  dropdownButton.textContent = selectedOption;
  dropdownMenu.classList.add('hidden');

    // Change background color based on selected option
  if (selectedOption === 'Delivered') {
    dropdownButton.classList.remove('bg-red-400');
    dropdownButton.classList.remove('bg-yellow-400');
    dropdownButton.classList.add('bg-green-400');
  } else if (selectedOption === 'Active') {
    dropdownButton.classList.remove('bg-green-400');
    dropdownButton.classList.remove('bg-red-400');
    dropdownButton.classList.add('bg-yellow-400');
  } else if (selectedOption === 'Cancelled') {
    dropdownButton.classList.remove('bg-green-400');
    dropdownButton.classList.remove('bg-yellow-400');
    dropdownButton.classList.add('bg-red-400');
  }
});