const closeIcon = document.querySelector('.close-icon')
const hamburger = document.querySelector('.hamburger')
const mobileNav = document.querySelector('.mobile-nav')
const overlay = document.querySelector('.overlay')
const cartIcon = document.querySelector('.cart-icon')
const cartDropdown = document.querySelector('.cart-dropdown')
const previousArrow = document.querySelectorAll('.previous-arrow')
const nextArrow = document.querySelectorAll('.next-arrow')
const currentProductImg = document.querySelectorAll('.product-img')
const minusIcon = document.querySelector('.minus-icon')
const quantityElm = document.querySelector('.quantity-picker span')
const plusIcon = document.querySelector('.plus-icon')
const addButton = document.querySelector('.add-button')
const cartItems = document.querySelector('.cart-items')
const cartEmpty = document.querySelector('.cart-empty')
const cartNotification = document.querySelector('.cart-notification')
const thumbs = document.querySelectorAll('.thumbs img')
const showLightbox = document.querySelector('.show-lightbox')
const lightbox = document.querySelector('.lightbox')
const hideLightbox = document.querySelector('.remove-lightbox')

hamburger.addEventListener('click', () => {
    mobileNav.style.display = 'flex'
    overlay.style.display = 'block'
    document.body.classList.add('stop-scrolling')
})


closeIcon.addEventListener('click', () => {
    mobileNav.style.display = 'none'
    overlay.style.display = 'none'
    document.body.classList.remove('stop-scrolling')
})

cartIcon.addEventListener('click', () => {
    cartDropdown.classList.contains('active') ? cartDropdown.classList.remove('active') : cartDropdown.classList.add('active')
})


let currentIndex = 0;
const imgsSrcs = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
]

nextArrow.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (currentIndex + 1 > imgsSrcs.length - 1) {
            currentIndex = 0
        } else {
            currentIndex++;
        }

        changeProductImg(currentIndex)
    })
})

previousArrow.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (currentIndex - 1 < 0) {
            currentIndex = imgsSrcs.length - 1;
        } else {
            currentIndex--;
        }

        changeProductImg(currentIndex)
    })
})




function changeProductImg(index) {
    currentProductImg.forEach(img => {
        img.src = imgsSrcs[index];
    })
}



// Picking quantity of the product

let currentQuantity = 0;

minusIcon.addEventListener('click', () => {
    if (currentQuantity !== 0) {
        currentQuantity--;
        quantityElm.innerText = currentQuantity;
    }
})


plusIcon.addEventListener('click', () => {
    currentQuantity++;
    quantityElm.innerText = currentQuantity;
})



// adding to cart
const item = (quantity, total) => {
    return `
        <div class="cart-item">
            <div class="cart-item-img">
                <img src="./images/image-product-1-thumbnail.jpg" alt="item-image">
            </div>
            <p class="item-details">
                <span class="item-name">Fall Limited Edition Sneakers </span>
                $<span class="price">125.00 x</span> <span class="quantity">${quantity}</span> <span class="total">$${total}</span>
            </p>
            <div class="delete-icon">
                <img src="./images/icon-delete.svg" alt="delete icon">
            </div>  
        </div>
        <a class="checkout-button">
            Checkout
        </a> 
    `
}

const cartEmptyText = '<p class="cart-empty">You cart is empty</p>'

addButton.addEventListener('click', () => {
    if (currentQuantity !== 0) {
        cartItems.innerHTML = item(currentQuantity, currentQuantity * 125)
        cartNotification.style.display = 'flex'
        cartNotification.innerText = currentQuantity
        const deleteIcon = document.querySelector('.delete-icon')

        // deleting item

        deleteIcon.addEventListener('click', () => {
            cartItems.innerHTML = cartEmptyText;
            cartNotification.style.display = 'none'

        })
    }


})


// navigating desktop thumbs

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        changeProductImg(thumb.getAttribute('data-id'))
        thumbs.forEach(thb => {
            if (thb.getAttribute('data-id') == thumb.getAttribute('data-id')) {
                thb.classList.add('active')
            } else {
                thb.classList.remove('active')
            }
        })
        // console.log(thumb.getAttribute('data-id'))
    })
})


// handling lightbox

showLightbox.addEventListener('click', () => {
    // console.log(window.matchMedia("(min-width: 980px)").matches)
    if (window.matchMedia("(min-width: 980px)").matches) {
        overlay.style.display = 'block'
        lightbox.style.display = 'block'
    }
})


hideLightbox.addEventListener('click', () => {
    overlay.style.display = 'none'
    lightbox.style.display = 'none'
})