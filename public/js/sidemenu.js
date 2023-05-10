$(document).ready(() => {
    const cateSidemenu = $(".cate-sidemenu")
    const hamburgerMenu = $(".hamburger-menu")

    const offcanvasBackdrop = $("<div>")
    offcanvasBackdrop.attr('id', 'offcanvas-backdrop')
    offcanvasBackdrop.fadeOut(0)
    $("body").append(offcanvasBackdrop)

    $(".cate-btn").on('click', () => {
        offcanvasBackdrop.fadeIn(300)
        cateSidemenu.toggleClass("show")
    })

    $(".navbar-burger").on('click', () => {
        offcanvasBackdrop.fadeIn(300)
        hamburgerMenu.toggleClass("show")
    })

    offcanvasBackdrop.on('click', () => {
        offcanvasBackdrop.fadeOut(300)
        cateSidemenu.removeClass("show")
        hamburgerMenu.removeClass("show")
    })
})
