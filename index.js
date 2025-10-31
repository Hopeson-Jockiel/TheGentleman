 // ===== MOBILE NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Toggle open/close menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu automatically when any link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});


// ==== 🛍️ Product Catalogue ====
const catalogues = [
  { id: 1, name: "Oxford Shoes", price: 120000 },
  { id: 2, name: "Italian Belt", price: 40000 },
  { id: 3, name: "Fedora Hat", price: 60000 },
  { id: 4, name: "Tailored Pants", price: 90000 },
  { id: 5, name: "Linen Shirt", price: 70000 },
  { id: 6, name: "Wristwatch", price: 100000 },
  { id: 7, name: "Jackets", price: 100000 },
  { id: 8, name: "Socks", price: 12000 },
  { id: 9, name: "Eye Glass", price: 25000 },
];

let cart = [];

// ==== 🧮 Update Total Price ====
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("totalPrice").textContent = total.toLocaleString();
}

// ==== 🛒 Toggle Add/Remove from Cart ====
function toggleCart(id) {
  const button = document.getElementById(`btn-${id}`);
  const quantityInput = document.getElementById(`quantity-${id}`);
  const quantity = parseInt(quantityInput.value) || 1;

  const item = catalogues.find(product => product.id === id);
  const inCart = cart.find(product => product.id === id);

  if (!inCart) {
    // Add to cart
    cart.push({ ...item, quantity });
    button.textContent = "Remove from Cart";
    button.style.background = "#ff4444";
  } else {
    // Remove from cart
    cart = cart.filter(product => product.id !== id);
    button.textContent = "Add to Cart";
    button.style.background = "linear-gradient(90deg, #d4af37, #c5a100)";
  }

  updateTotal();
}

// ==== 🔢 Update Quantity ====
function updateQuantity(id) {
  const quantityInput = document.getElementById(`quantity-${id}`);
  const quantity = parseInt(quantityInput.value) || 1;
  const productInCart = cart.find(product => product.id === id);

  if (productInCart) {
    productInCart.quantity = quantity;
    updateTotal();
  }
}

// ==== 💳 Checkout Modal ====
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const checkoutSummary = document.getElementById("checkoutSummary");
  const checkoutForm = document.getElementById("checkoutForm");

  // ==== 🧾 Show Checkout Modal ====
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("🛒 Your cart is empty! Please add some items first.");
      return;
    }

    // Display checkout summary
    checkoutSummary.innerHTML = cart
      .map(
        item =>
          `<p>${item.name} × ${item.quantity} — ₦${(
            item.price * item.quantity
          ).toLocaleString()}</p>`
      )
      .join("");

    checkoutModal.style.display = "flex";
  });

  // ==== ❌ Close Modal ====
  closeModalBtn.addEventListener("click", () => {
    checkoutModal.style.display = "none";
  });

  // ==== 🪟 Close Modal When Clicking Outside ====
  window.addEventListener("click", e => {
    if (e.target === checkoutModal) {
      checkoutModal.style.display = "none";
    }
  });

  // ==== 💰 Handle Payment Submission ====
  checkoutForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiryDate = document.getElementById("expiryDate").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Simple validations
    if (!name || !email || !cardNumber || !expiryDate || !cvv) {
      alert("⚠️ Please fill out all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Invalid email format.");
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("Card number must be 16 digits.");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("CVV must be 3 digits.");
      return;
    }

    alert(`✅ Thank you, ${name}! Your payment was successful.`);

    // ==== 🔄 Reset Cart and UI ====
    cart = [];
    updateTotal();
    checkoutModal.style.display = "none";
    checkoutForm.reset();

    // Reset buttons back to "Add to Cart"
    catalogues.forEach(product => {
      const btn = document.getElementById(`btn-${product.id}`);
      if (btn) {
        btn.textContent = "Add to Cart";
        btn.style.background = "linear-gradient(90deg, #d4af37, #c5a100)";
      }
    });
  });
});
