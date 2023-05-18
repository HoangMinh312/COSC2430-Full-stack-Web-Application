const searchForm = document.getElementById('searchForm')
const pageLinks = document.querySelectorAll('.page-link')
const sortForm = document.querySelector('.sortForm')
const defaultSort = document.getElementById('default')
const priceAscSort = document.getElementById('priceAsc')
const priceDescSort = document.getElementById('priceDesc')

document.querySelectorAll(".queryForm").forEach(form => {
  form.addEventListener('submit', (event) => {
    // Prevent default submission
    event.preventDefault()

    const params = new URLSearchParams(window.location.search)
    params.delete('tags')

    // In case if its from the sort form
    const clickedButton = document.querySelector('button[type="submit"]:focus');

    const formData = new URLSearchParams(new FormData(form)).toString();
    const tags = (new URLSearchParams(formData)).getAll('tags')
    console.log(new URLSearchParams(formData));

    const newParams = new URLSearchParams(formData);
    newParams.forEach((value, key) => {
      if (key == 'tags') {
        params.append(key, value)
      } else params.set(key, value)
    });

    const url = `${window.location.pathname}?${params.toString()}`;
    window.location.href = url;

    // console.log(formData)
    // searchForm.submit()          
  })
})

sortForm.addEventListener('submit', (event) => {
  // Prevent default submission
  event.preventDefault()

  const params = new URLSearchParams(window.location.search)

  const clickedButton = document.querySelector('button[type="submit"]:focus');
  const sortValue = clickedButton.getAttribute('value');
  // console.log(sortValue);

  params.set('sort', sortValue)

  const url = `${window.location.pathname}?${params.toString()}`;
  window.location.href = url;

  // console.log(formData)
  // searchForm.submit()          
})

searchForm.addEventListener('submit', (event) => {
  // Prevent default submission
  event.preventDefault()

  const urlParams = new URLSearchParams(window.location.search)

  const newUrlParams = new URLSearchParams()
  saveParam(urlParams, newUrlParams, 'category')

  const formData = new URLSearchParams(new FormData(searchForm)).toString();

  const newParams = new URLSearchParams(formData);
  newParams.forEach((value, key) => {
    newUrlParams.set(key, value);
  });

  const url = `${window.location.pathname}?${newUrlParams.toString()}`;
  window.location.href = url;
})



pageLinks.forEach((pageLink) => {
  pageLink.addEventListener('click', () => {
    goTo(pageLink.getAttribute('data-page-number'))
  })
})

function goTo(pageQuery) {
  const params = new URLSearchParams(window.location.search)

  params.set('page', pageQuery);

  const url = `${window.location.pathname}?${params.toString()}`;
  window.location.href = url;
}

function saveParam(oldUrlPrams, newUrlParams, key) {
  const keyParam = oldUrlPrams.get(key)
  newUrlParams.set(key, keyParam || '')
}
