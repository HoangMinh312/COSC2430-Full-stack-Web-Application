const searchForm = document.getElementById('searchForm')
// const filterForm = document.getElementById('filterForm')
const pageLinks = document.querySelectorAll('.page-link')

document.querySelectorAll(".queryForm").forEach(form => {
  form.addEventListener('submit', (event) => {
    // Prevent default submission
    event.preventDefault()

    const params = new URLSearchParams(window.location.search)

    const formData = new URLSearchParams(new FormData(form)).toString();

    const newParams = new URLSearchParams(formData);
    newParams.forEach((value, key) => {
      params.set(key, value);
    });

    const url = `${window.location.pathname}?${params.toString()}`;
    window.location.href = url;

    // console.log(formData)
    // searchForm.submit()          
  })
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
