document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.card-bottom')) {
        displayCartItems();
        initializeCartControls();
    }
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tableBody = document.querySelector('.card-bottom table');
    
    if (!tableBody) return;

    if (cart.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 20px;">
                    <h3>Your cart is empty</h3>
                    <a href="index.html" style="color: #82ae46; text-decoration: none; margin-top: 10px; display: inline-block;">
                        Continue Shopping
                    </a>
                </td>
            </tr>
        `;
        const totalElement = document.querySelector('.cart-total');
        if (totalElement) totalElement.textContent = '$0.00';
        return;
    }

    let html = `
        <tr>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Total</td>
            <td>Action</td>
        </tr>
    `;

    cart.forEach(item => {
        html += `
            <tr data-id="${item.id}">
                <td class="td-image-main">
                    <div class="td-image">
                        <img src="${item.image}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </div>
                </td>
                <td>$${item.newPrice.toFixed(2)}</td>
                <td class="quantity-cell">
                    <button class="quantity-btn decrease">-</button>
                    <span>${item.quantity || 1}</span>
                    <button class="quantity-btn increase">+</button>
                </td>
                <td>$${((item.quantity || 1) * item.newPrice).toFixed(2)}</td>
                <td><i class="material-icons delete-btn" aria-hidden="true">delete</i></td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
    updateCartTotal();
}

// ... (keep the rest of the cart.js functions as they are) 