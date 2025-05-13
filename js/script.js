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
        image: '/images/product-1.webp',
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
        image: '/images/product-2.webp',
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
        image: '/images/product-3.webp',
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
        image: '/images/product-4.webp',
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
        image: '/images/product-5.webp',
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
        image: '/images/product-6.webp',
        rating: 4.5,
        waight: '1.5kg',
        oldPrice: 49.20,
        newPrice: 42.13,
        category: 'Dried Fruits',
        availability: 'In stock',
        varity: "sale",
    }
];

function renderProducts(products, container) {
    if (!container) return; // Guard clause if container doesn't exist
    
    let html = "";
    products.forEach((element, index) => {
        html += `
        <div class="card-box">
            <div class="card-image-box">
                <img src="${element.image}" alt="${element.name}">
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
                <span id="new-price">$${element.newPrice.toFixed(2)}</span>
                <span id="old-price">$${element.oldPrice.toFixed(2)}</span>
            </div>
            <div class="card-icon-box">
                <i class="material-icons add-to-cart" data-product='${JSON.stringify(element)}' aria-hidden="true">shopping_cart</i>
                <i class="material-icons" data-index="${index}" id="details-icon" aria-hidden="true">info</i>
                <div class="stock">
                    <span>${element.availability}</span>
                </div>
                <div class="varity">${element.varity}</div>
            </div>
        </div>
        `;
    });
    container.innerHTML = html;

    // Add click event listeners to cart icons
    const cartIcons = container.querySelectorAll('.add-to-cart');
    cartIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const productData = JSON.parse(this.getAttribute('data-product'));
            addToCart(productData);
        });
    });
}

// Cart functionality
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemCount();
    alert('Product added to cart!');
}

function updateCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountElement = document.querySelector('.cart span');
    if (cartCountElement) {
        cartCountElement.textContent = `${totalItems} Items`;
    }
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', () => {
    updateCartItemCount();
    
    // Render products if containers exist
    const productCard = document.querySelector('.Deals-product-section-bottom');
    if (productCard) {
        renderProducts(dealsProduct, productCard);
    }

    const arivalContainer = document.querySelector('.new-arival-bottum');
    if (arivalContainer) {
        renderProducts(newArival, arivalContainer);
    }

    // Update styles
    updateStockAndVarietyStyles();
    
    // Render blog if container exists
    const blogBottom = document.querySelector(".blog-bottum");
    if (blogBottom) {
        renderBlogPosts(blogBottom);
    }
});

function updateStockAndVarietyStyles() {
    document.querySelectorAll('.stock span').forEach(stockSpan => {
        stockSpan.style.color = stockSpan.textContent.trim() === 'In stock' ? '#5CAF90' : '#FF0000';
    });

    document.querySelectorAll(".varity").forEach(varity => {
        const text = varity.textContent.trim().toLowerCase();
        if (text === "sale") {
            varity.style.backgroundColor = '#FF0000';
        } else if (text === "new") {
            varity.style.backgroundColor = '#5CAF90';
        } else {
            varity.style.display = "none";
        }
    });
}

function renderBlogPosts(container) {
    let blogHtml = "";
    blogProducts.forEach((element, index) => {
        blogHtml += `
            <div class="blog-box">
                <div class="image-box">
                    <img src="${element.image}" alt="${element.name}">
                </div>
                <h5>${element.date} - <strong>${element.category}</strong></h5>
                <h2>${element.name}</h2>
                <button data-index="${index}">Read More</button>
            </div>
        `;
    });
    container.innerHTML = blogHtml;
}

// New Arrival products
const newArival = [
    {
        id: 1.2,
        name: 'Sungold Kiwifruit Punnet',
        image: '/images/secound-obj-1.webp',
        rating: 4.3,
        waight: '500g',
        oldPrice: 39.60,
        newPrice: 33.00,
        category: 'Fruit',
        availability: 'In stock',
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
        varity: "new",
    },
    {
        id: 2.2,
        name: 'American Cream & Onion Flavour',
        image: '/images/secound-obj-2.webp',
        rating: 3.7,
        waight: '200g',
        oldPrice: 37.38,
        newPrice: 29.33,
        category: 'Snacks',
        availability: 'Out of stock',
        varity: "",
    },
    {
        id: 3.2,
        name: 'Dates Value Fresh Pouch',
        image: '/images/secound-obj-3.webp',
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
        image: '/images/secound-obj-4.webp',
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
        image: '/images/secound-obj-5.webp',
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
        image: '/images/secound-obj-6.webp',
        rating: 5.0,
        waight: '6pcs',
        oldPrice: 80.20,
        newPrice: 60.13,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "sale",
    },
    {
        id: 7.2,
        name: 'Blue berry',
        image: '/images/secound-obj-7.webp',
        rating: 3.3,
        waight: '8pcs',
        oldPrice: 30.00,
        newPrice: 26.13,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "new",
    },
    {
        id: 8.2,
        name: 'Pineapple',
        image: '/images/secound-obj-8.webp',
        rating: 4.0,
        waight: '1pcs',
        oldPrice: 22.00,
        newPrice: 16.13,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "new",
    },
    {
        id: 9.2,
        name: 'Mixed Nuts & Almonds Dry Fruits',
        image: '/images/secound-obj-9.webp',
        rating: 4.6,
        waight: '500g',
        oldPrice: 49.00,
        newPrice: 66.13,
        category: 'Foods',
        availability: 'Out of stock',
        varity: "",
    },
    {
        id: 10.2,
        name: 'Berry & Grapes',
        image: '/images/secound-obj-10.webp',
        rating: 2.6,
        waight: '500g',
        oldPrice: 49.00,
        newPrice: 30.13,
        category: 'Mix Snack',
        availability: 'In stock',
        varity: "",
    }
];

// Blog products
const blogProducts = [
    {
        id: 3.1,
        name: 'Marketing Guide: 5 Steps to Success to way.',
        image: '/images/blog-1.webp',
        date: "June 30, 2024",
        category: "Organic",
    },
    {
        id: 3.2,
        name: 'Best way to solve business deal issue in market.',
        image: '/images/blog-2.webp',
        date: "April 02, 2024",
        category: "Fruits",
    },
    {
        id: 3.3,
        name: 'Marketing Guide: 5 Steps to Success to way.',
        image: '/images/blog-3.webp',
        date: "Mar 09, 2024",
        category: "Vegetables",
    },
    {
        id: 3.4,
        name: 'Business ideas to grow your business traffic.',
        image: '/images/blog-4.webp',
        date: "January 25, 2024",
        category: "Fastfood",
    },
    {
        id: 3.5,
        name: 'Marketing Guide: 5 Steps way to Success.',
        image: '/images/blog-5.webp',
        date: "December 10, 2024",
        category: "Fruits",
    }
];


