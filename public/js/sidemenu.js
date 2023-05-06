const cate_btn = document.querySelector(".cate-btn")
const cate_sidemenu = document.querySelector(".cate-sidemenu")
const cate_backdrop = document.createElement('div')
cate_backdrop.classList.add("offcanvas")
// cate_backdrop.classList.add("show")
cate_sidemenu.insertAdjacentElement('afterend', cate_backdrop)

cate_btn.addEventListener("click", () => {
    cate_sidemenu.classList.toggle("show")
    cate_backdrop.classList.toggle("show")
})

cate_backdrop.addEventListener('click', () => {
    cate_sidemenu.classList.remove("show")
    cate_backdrop.classList.remove("show")
    // cate_backdrop.remove()
})

