window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  $(document).ready(function () {
    $(".slider").slick({
      infinite: true, // Enable infinite looping
      slidesToShow: 3, // Show 3 slides at a time on larger screens
      slidesToScroll: 1, // Scroll 1 slide at a time
      autoplay: true, // Enable autoplay
      autoplaySpeed: 1500, // Autoplay speed
      arrows: false, // Hide navigation arrows
      speed: 500, // Animation speed
      responsive: [
        // Responsive settings
        {
          breakpoint: 1024, // For screens less than 1024px
          settings: {
            slidesToShow: 2, // Show 2 slides
          },
        },
        {
          breakpoint: 768, // For screens less than 768px
          settings: {
            slidesToShow: 1, // Show 1 slide
            slidesToScroll: 1,
          },
        },
      ],
    });
  });
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i]

    if ($(tag).offset().top < pageBottom) {
      $(tag).addClass("visible")
    } else {
      $(tag).removeClass("visible")
    }
  }


const cart = [];
const cartTotalElement = document.getElementById('cartTotal');
const cartItemsElement = document.getElementById('cartItems');
const cartCountElement = document.getElementById('cartCount'); // Badge element

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
  let cartItemCount = 0;

  if (cart.length === 0) {
      cartItemsElement.innerHTML = '<p>Your cart is currently empty.</p>';
      document.getElementById('checkoutBtn').disabled = true; // Disable checkout button
      cartCountElement.textContent = 0; // Update cart count badge
  } else {
      cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
          cartItemCount += item.quantity;

          cartItemsElement.innerHTML += `
              <div class="d-flex justify-content-between align-items-center mb-2">
                  <span>${item.name} (x${item.quantity})</span>
                  <div>
                      <button class="btn btn-sm btn-secondary me-1 decreaseQty" data-name="${item.name}">-</button>
                      <button class="btn btn-sm btn-secondary increaseQty" data-name="${item.name}">+</button>
                      <span>${item.price} x ${item.quantity} = ${itemTotal.toFixed(2)}</span>
                  </div>
              </div>
          `;
      });

      cartTotalElement.textContent = total.toFixed(2); // Display total
      cartCountElement.textContent = cartItemCount; // Update cart count badge
      document.getElementById('checkoutBtn').disabled = false; // Enable checkout button
  }

  // Attach event listeners to + and - buttons
  document.querySelectorAll('.increaseQty').forEach(button => {
      button.addEventListener('click', () => {
          const productName = button.getAttribute('data-name');
          const product = cart.find(item => item.name === productName);
          if (product) {
              product.quantity += 1;
              updateCart();
          }
      });
  });

  document.querySelectorAll('.decreaseQty').forEach(button => {
      button.addEventListener('click', () => {
          const productName = button.getAttribute('data-name');
          const product = cart.find(item => item.name === productName);
          if (product) {
              product.quantity -= 1;
              if (product.quantity === 0) {
                  const productIndex = cart.indexOf(product);
                  cart.splice(productIndex, 1); // Remove product from cart if quantity is 0
              }
              updateCart();
          }
      });
  });
}

// Checkout button functionality
document.getElementById('checkoutBtn').addEventListener('click', () => {
  // Save cart data to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  // Redirect to checkout page
  window.location.href = 'order.html';
});
