// Get cart data from localStorage
const cartData = JSON.parse(localStorage.getItem('cart')) || [];
const selectedProductsElement = document.getElementById('selectedProducts');

if (cartData.length > 0) {
    cartData.forEach(item => {
        selectedProductsElement.innerHTML += `
            <div>${item.name} (x${item.quantity}) - Price: ${item.price} x ${item.quantity} = ${item.price * item.quantity}</div>
        `;
    });
} else {
    selectedProductsElement.innerHTML = '<p>No products selected.</p>';
}

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather user input and cart details
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Prepare the order summary
    let orderSummary = `Order Summary for ${name}:\n\n`;
    cartData.forEach(item => {
        orderSummary += `${item.name} (x${item.quantity}) - Price: ${item.price} x ${item.quantity} = ${item.price * item.quantity}\n`;
    });
    orderSummary += `\nTotal Amount: ${cartData.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}`;
    orderSummary += `\n\nShipping Address: ${address}\nEmail: ${email}`;

    // Display order summary in an alert (or you can log it or send it to a backend)
    alert(orderSummary);

    // Clear cart data
    localStorage.removeItem('cart');
    // Redirect to home or confirmation page
    window.location.href = 'index.html'; // Change to your home page
});