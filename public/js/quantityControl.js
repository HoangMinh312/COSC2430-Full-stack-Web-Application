$(document).ready(function () {
    const editableQuantity = $("#editableQuantity")
    const quantityDecrease = $("#quantityDecrease")
    const quantityIncrease = $("#quantityIncrease")


    // Prevent the field from getting non-numeric value
    editableQuantity.keypress(e => {
        if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
    });

    editableQuantity.on('input', function () {
        if (parseInt($(this).text()) >= 999) {
            $(this).text($(this).text().slice(0, -1))
        }
    })

    // Incase the user leave the field empty, default it to 1
    editableQuantity.on('blur', function() {
        if ($(this).is(':empty')) {
            $(this).text(1)
        }
    })

    quantityDecrease.on('click', (e) => {
        let currentValue = parseInt(editableQuantity.text())
        if (currentValue <= 1) return
        editableQuantity.text(currentValue - 1)
    })

    quantityIncrease.on('click', (e) => {
        let currentValue = parseInt(editableQuantity.text())
        if (currentValue >= 999) return
        editableQuantity.text(currentValue + 1)
    })
})