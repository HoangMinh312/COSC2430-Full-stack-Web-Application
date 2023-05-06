const panel_filter = document.getElementsByClassName("filter-panel")
const subpanel_filter = document.getElementsByClassName("filter-subpanel")
const show_icon = document.getElementsByClassName("show-icon")
const hide_icon = document.getElementsByClassName("hide-icon")

panel_filter[0].addEventListener("click", () => {
    subpanel_filter[0].classList.toggle('hidden')
    show_icon[0].classList.toggle('hidden')
    hide_icon[0].classList.toggle('hidden')
})
