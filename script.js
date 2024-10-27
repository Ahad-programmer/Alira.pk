const cart = [];
const cartTotalElement = document.getElementById('cartTotal');
const cartItemsElement = document.getElementById('cartItems');

// Add to cart functionality
document.querySelectorAll('.boo').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.closest('.card-body').querySelector('.card-title').innerText;
        const productPrice = parseFloat(button.closest('.card-body').querySelector('.fw-bold').innerText);

        // Check if product already in cart
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    });
});

// Update cart display
function updateCart() {
    cartItemsElement.innerHTML = ''; // Clear previous items
    let total = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is currently empty.</p>';
        document.getElementById('checkoutBtn').disabled = true; // Disable checkout button
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartItemsElement.innerHTML += `
                <div class="d-flex justify-content-between">
                    <span>${item.name} (x${item.quantity})</span>
                    <span>${item.price} x ${item.quantity} = ${itemTotal}</span>
                </div>
            `;
        });
        cartTotalElement.textContent = total.toFixed(2); // Display total
        document.getElementById('checkoutBtn').disabled = false; // Enable checkout button
    }
}

// Updated Checkout button functionality
document.getElementById('checkoutBtn').addEventListener('click', () => {
    // Save cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Redirect to checkout page
    window.location.href = 'order.html';
});