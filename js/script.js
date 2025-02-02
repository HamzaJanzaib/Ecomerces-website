// Hero section slider
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const heroSwiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    }
});

// Deal timer countdown
let targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 24);

// Update timer every second
setInterval(() => {
    const currentDate = new Date();
    const difference = targetDate - currentDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');

    if (difference < 0) {
        targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + 24);
    }
}, 1000);



// Deals product object
const dealsProduct = [
    {
        id: 1,
        name: 'Natural Hub Cherry Karonda',
        image: '/images/product-1.jpg',
        rating: 4.5,
        waight: '1kg',
        oldPrice: 65.00,
        newPrice: 49.00,
        category: 'Fruit',
        availability: 'In stock',
        varity: "new",
    },
    {
        id: 2,
        name: 'Fresh Mango juice pack',
        image: '/images/product-2.jpg',
        rating: 2.5,
        waight: '600ml',
        oldPrice: 35.38,
        newPrice: 30.33,
        category: 'Tuber root',
        availability: 'Out of stock',
        varity: "",
    },
    {
        id: 3,
        name: 'Multi Grain Combo Cookies',
        image: '/images/product-3.jpg',
        rating: 3.9,
        waight: '5kg',
        oldPrice: 45.20,
        newPrice: 38.63,
        category: 'Cookies',
        availability: 'In stock',
        varity: "sale",
    },
    {
        id: 4,
        name: 'Natural Hub Cherry Karonda',
        image: '/images/product-4.jpg',
        rating: 3.3,
        waight: '5kg',
        oldPrice: 45.20,
        newPrice: 38.63,
        category: 'Dried Fruits',
        availability: 'In stock',
        varity: "new"
    },
    {
        id: 5,
        name: 'Stick Fiber Masala Magic',
        image: '/images/product-5.jpg',
        rating: 4.5,
        waight: '2kg',
        oldPrice: 20.20,
        newPrice: 18.63,
        category: 'Foods',
        availability: 'Out of stock',
        varity: "",

    },
    {
        id: 6,
        name: 'Mixed Nuts Berries Pack',
        image: '/images/product-6.jpg',
        rating: 4.5,
        waight: '1.5kg',
        oldPrice: 49.20,
        newPrice: 42.13,
        category: 'Dried Fruits',
        availability: 'In stock',
        varity: "sale",
    },
]


let productCard = document.querySelector('.Deals-product-section-bottom');

let clutter = "";

dealsProduct.forEach((element, index) => {
    clutter += `
    <div class="card-box">
                    <div class="card-image-box">
                        <img src="${element.image}" alt="Product Image">
                    </div>
                    <p>${element.category}</p>
                    <h2>${element.name}</h2>
                    <div class="card-rating-box">
                       <div class="rating">
                        <span>(${element.rating})<i class="material-icons" aria-hidden="true">star</i></span>
                       </div>
                        <div class="waight">
                            <span>${element.waight}</span>
                        </div>
                    </div>
                    <div class="card-price-box">
                        <span id="new-price">$${element.newPrice}</span>
                        <span id="old-price">$${element.oldPrice}</span>
                    </div>
                    <div class="card-icon-box">
                        <i class="material-icons" data-index="${index}" id="cart-icon" aria-hidden="true">shopping_cart</i>
                        <i class="material-icons" data-index="${index}" id="details-icon" aria-hidden="true">info</i>
                        <div class="stock">
                            <span>${element.availability}</span>
                        </div>
                        <div class="varity"> ${element.varity}</div>
                    </div>
                </div>
    `;

    productCard.innerHTML = clutter;
})


// Update stock color based on availability
document.querySelectorAll('.stock span').forEach(stockSpan => {
    if (stockSpan.textContent === 'In stock') {
        stockSpan.style.color = '#5CAF90'; // Green color matching theme
    } else {
        stockSpan.style.color = '#FF0000'; // Red color
    }
});

document.querySelectorAll(".varity").forEach(varity =>{
    if(varity.textContent === "sale"){
        varity.style.color = '#FF0000';
    } else if(varity.textContent === "new"){
        varity.style.color = '#5CAF90';
    }else{
        varity.style.display = "none" ;
    }
})

// Deals product object
const newArival = [
    {
        id: 1.2,
        name: 'Sungold Kiwifruit Punnet',
        image: '/images/secound-obj-1.jpg',
        rating: 4.3,
        waight: '500g',
        oldPrice: 39.60,
        newPrice: 33.00,
        category: 'Fruit',
        availability: 'In stock',
        descripation: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They’re also Low GI and Low Fodmap.",
        varity: "new",
    },
    {
        id: 2.2,
        name: ' American Cream & Onion Flavour.',
        image: '/images/secound-obj-2.jpg',
        rating: 3.7,
        waight: '200g',
        oldPrice: 37.38,
        newPrice: 29.33,
        category: 'snacks',
        availability: 'Out of stock',
        varity: "",
    },
    {
        id: 3.2,
        name: 'Dates Value Fresh Pouch',
        image: '/images/secound-obj-3.jpg',
        rating: 3.9,
        waight: '5kg',
        oldPrice: 85.40,
        newPrice: 66.30,
        category: 'Dried Fruits',
        availability: 'In stock',
        varity: "sale",
    },
    {
        id: 4.2,
        name: 'Fresh Mango juice pack',
        image: '/images/secound-obj-4.jpg',
        rating: 3.3,
        waight: '1kg',
        oldPrice: 21.20,
        newPrice: 16.05,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "new"
    },
    {
        id: 5.2,
        name: 'Sweet Corn',
        image: '/images/product-5.jpg',
        rating: 4.9,
        waight: '3 pcs',
        oldPrice: 17.20,
        newPrice: 10.00,
        category: 'Vegetables',
        availability: 'Out of stock',
        varity: "",

    },
    {
        id: 6.2,
        name: 'Kamalam Fruit',
        image: '/images/product-6.jpg',
        rating: 5.0,
        waight: '6pcs',
        oldPrice: 80.20,
        newPrice: 60.13,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "sale",
    },
    {
        id: 6.2,
        name: 'Blue berry',
        image: '/images/product-7.jpg',
        rating: 3.0,
        waight: '8pcs',
        oldPrice: 30.00,
        newPrice: 26.13,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "new",
    },
]


