$(document).ready(() => {
    const panel_filter = $(".filter-panel")
    const subpanel_filter = $(".filter-subpanel")
    const show_icon = $(".show-icon")
    const hide_icon = $(".hide-icon")

    for (let i = 0; i < panel_filter.length; i++) {
        panel_filter.eq(i).on('click', () => {
            subpanel_filter.eq(i).toggleClass('hidden')
            show_icon.eq(i).toggleClass('hidden')
            hide_icon.eq(i).toggleClass('hidden')
        })
    }

    $('.sort').on('click', () => {
        console.log('hell')
        $('.drop-down-container').toggle()
    })
})
