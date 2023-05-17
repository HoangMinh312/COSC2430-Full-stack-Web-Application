$(document).ready(() => {
    const userProfile = $('#user')
    const dropDown = $('<div>', {
        id: 'user-drop-down'
    })
    const viewProfile = $('<a>', {
        id: 'user-drop-down-links',
        text: 'View profile'
    })
    const logOut = $('<a>', {
        id: 'user-drop-down-links',
        text: 'Log out'
    })

    const userType = userProfile.data('user-type').toLowerCase()
    const profileLink = `/users/${userType}/profile`

    viewProfile.attr('href', profileLink)
    logOut.attr('href', '/auth/logout')

    dropDown.append(viewProfile)
    dropDown.append(logOut)

    userProfile.append(dropDown)

    userProfile.on('click', () => {
        dropDown.toggle()
    })
})