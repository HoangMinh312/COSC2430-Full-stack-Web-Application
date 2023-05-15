$(document).ready(function () {
    const fullStar = $('<img class="w-6" src="/svg/yellow-star-fill.svg" alt="yellow-star-fill">')
    const halfStar = $('<img class="w-6" src="/svg/yellow-half-star-fill.svg" alt="yellow-star-fill">')
    const emptyStar = $('<img class="w-6" src="/svg/no-star-fill.svg" alt="yellow-star-fill">')
    const rating = $('.rating')
    const ratingValue = rating.data('rating')
    const reviewNumber = rating.data('review-number')
    const devider = $('<span>|</span>').css('color', 'rgb(209 213 219)')
    const ratingInfo = $(`<p>${ratingValue} ${devider[0].outerHTML} ${reviewNumber} Review${checkPlural(reviewNumber)}</p>`)
    let roundedRatingValue = roundToHalf(ratingValue)

    checkRating(emptyStar, halfStar, fullStar, roundedRatingValue).forEach(starValue => {
        // console.log(starValue)
        let starClone = starValue.clone()
        rating.append(starClone)
    })

    ratingInfo.css('margin-left', '8px')
    rating.append(ratingInfo)
})

function checkRating(empty, half, full, rating) {
    let ratingArr = []
    for (let i = 0; i < 5; i++) {
        if (rating < 0) {
            ratingArr.push(empty)
            continue
        }
        // (rating - 1) < 0 means its a 0.5 else its a 1
        if ((rating - 1) >= 0) {
            ratingArr.push(full)
        } else {
            ratingArr.push(half)
        }

        rating -= 1
    }
    return ratingArr
}

function roundToHalf(floatNumber) {
    return Math.round(floatNumber * 2) / 2;
}

function checkPlural(n) {
    return n > 1 ? 's' : ''
}
