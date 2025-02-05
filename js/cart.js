// Get cart elements
const quantityCell = document.querySelector('.quantity-cell');
const decreaseBtn = quantityCell.querySelector('.quantity-btn:first-child');
const increaseBtn = quantityCell.querySelector('.quantity-btn:last-child');
const quantitySpan = quantityCell.querySelector('span');
const deleteBtn = document.getElementById('delete-btn');
const cartTotalElement = document.querySelector('.cart-total');

// Get price elements
const priceCell = document.querySelector('td:nth-child(2)');
const totalCell = document.querySelector('td:nth-child(4)');
const basePrice = parseFloat(priceCell.textContent.replace('$', ''));

// Function to update total price
function updateTotal(quantity) {
    const total = basePrice * quantity;
    totalCell.textContent = `$${total.toFixed(2)}`;
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Decrease quantity
decreaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantitySpan.textContent);
    if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
        updateTotal(quantity);
    }
});

// Increase quantity
increaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantitySpan.textContent);
    quantity++;
    quantitySpan.textContent = quantity;
    updateTotal(quantity);
});

// Delete product
deleteBtn.addEventListener('click', () => {
    const row = deleteBtn.closest('tr');
    row.remove();
    cartTotalElement.textContent = '$0.00';
});

// Function to handle quantity changes in cart
function initializeCartQuantityControls() {
    const quantityCells = document.querySelectorAll('.quantity-cell');
    const cartTotalElement = document.querySelector('.cart-total');
    
    quantityCells.forEach(cell => {
        const decreaseBtn = cell.querySelector('.quantity-btn:first-child');
        const increaseBtn = cell.querySelector('.quantity-btn:last-child');
        const quantitySpan = cell.querySelector('span');
        const row = cell.closest('tr');
        const priceCell = row.querySelector('td:nth-child(2)');
        const totalCell = row.querySelector('td:nth-child(4)');
        
        // Get the base price (without $ sign and convert to number)
        const basePrice = parseFloat(priceCell.textContent.replace('$', ''));
        
        // Function to update total
        const updateTotal = (quantity) => {
            const total = basePrice * quantity;
            totalCell.textContent = `$${total}`;
            updateCartTotal();
        };
        
        // Decrease quantity
        decreaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateTotal(quantity);
            }
        });
        
        // Increase quantity
        increaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updateTotal(quantity);
        });
    });
}

// Function to update the total cart value
function updateCartTotal() {
    const totalCells = document.querySelectorAll('.card-bottom table tr td:nth-child(4)');
    const cartTotalElement = document.querySelector('.cart-total');
    let cartTotal = 0;
    
    totalCells.forEach((cell, index) => {
        if (cell.textContent && index > 0) { // Skip header row
            cartTotal += parseFloat(cell.textContent.replace('$', ''));
        }
    });
    
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    }
}

// Function to handle delete items from cart
function initializeDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    deleteButtons.forEach(button => {
        if (button.textContent === 'delete') {  // Only target delete buttons
            button.addEventListener('click', () => {
                const row = button.closest('tr');
                row.remove();
                updateCartTotal();
            });
        }
    });
}

// Initialize all cart functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCartQuantityControls();
    initializeDeleteButtons();
    updateCartTotal();
}); 