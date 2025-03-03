// Placeholder for JavaScript functionality
// Will be used for cart, search, and other interactive features

document.querySelectorAll(".dropdown").forEach((dropdown) => {
  dropdown.addEventListener("click", () => {
    dropdown.querySelector(".dropdown-content").classList.toggle("show");
  });
});

// Thumbnail Image Switcher
const mainImage = document.querySelector(".main-image");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    mainImage.src = thumbnail.src;
  });
});

// Sample Cart Data (to be replaced with localStorage logic)
let cart = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    image: "product1.jpg",
    quantity: 2,
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    image: "product2.jpg",
    quantity: 1,
  },
];

// Toggle Shop by Category dropdown
const shopCategory = document.querySelector(".shop-category");
const categoryToggle = document.querySelector(".category-toggle");

categoryToggle.addEventListener("click", () => {
  shopCategory.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!shopCategory.contains(event.target)) {
    shopCategory.classList.remove("active");
  }
});

// Render Cart Items
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity">
                <input type="number" value="${
                  item.quantity
                }" min="1" onchange="updateQuantity(${item.id}, this.value)">
            </div>
            <button class="remove-button" onclick="removeItem(${
              item.id
            })">Remove</button>
        `;

    cartList.appendChild(cartItem);
    subtotal += item.price * item.quantity;
  });

  // Update Summary
  const tax = subtotal * 0.1; // 10% tax
  const shipping = 5.0; // Fixed shipping cost
  const total = subtotal + tax + shipping;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("shipping").textContent = shipping.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

// Update Quantity
function updateQuantity(id, quantity) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity = parseInt(quantity);
    renderCart();
  }
}

// Remove Item
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

// Initial Render
renderCart();

// Tab Switching Functionality
function openTab(tabName) {
  const tabContents = document.querySelectorAll(".auth-tab-content");
  const tabLinks = document.querySelectorAll(".tab-link");

  // Hide all tab contents
  tabContents.forEach((tab) => tab.classList.remove("active"));

  // Remove active class from all tab links
  tabLinks.forEach((link) => link.classList.remove("active"));

  // Show the selected tab content
  document.getElementById(tabName).classList.add("active");

  // Add active class to the clicked tab link
  document
    .querySelector(`.tab-link[onclick="openTab('${tabName}')"]`)
    .classList.add("active");
}

// Advanced Search Form Submission
document
  .getElementById("advanced-search-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const price = priceRange.value;
    const keywords = document.getElementById("keywords").value.trim();
    const condition = document.getElementById("condition").value;

    // Simulate search logic (replace with actual backend integration)
    alert(`Searching for:
- Category: ${category}
- Price: $${price}
- Keywords: ${keywords}
- Condition: ${condition}`);
  });

// Sample Brands Data (to be saved in localStorage)
const brands = [
  {
    id: 1,
    name: "Brand 1",
    image: "brand1-logo.jpg",
    link: "brand1-products.html",
  },
  {
    id: 2,
    name: "Brand 2",
    image: "brand2-logo.jpg",
    link: "brand2-products.html",
  },
  {
    id: 3,
    name: "Brand 3",
    image: "brand3-logo.jpg",
    link: "brand3-products.html",
  },
];

// Save brands to localStorage (run once)
localStorage.setItem("brands", JSON.stringify(brands));

// Load brands dynamically
document.addEventListener("DOMContentLoaded", function () {
  const brandsGrid = document.querySelector(".brands-grid");
  const storedBrands = JSON.parse(localStorage.getItem("brands")) || [];

  if (storedBrands.length === 0) {
    brandsGrid.innerHTML = "<p>No brands found.</p>";
    return;
  }

  storedBrands.forEach((brand) => {
    const brandElement = document.createElement("div");
    brandElement.className = "brand";
    brandElement.innerHTML = `
            <img src="${brand.image}" alt="${brand.name}">
            <h3>${brand.name}</h3>
            <a href="${brand.link}">View Products</a>
        `;
    brandsGrid.appendChild(brandElement);
  });
});

// Add search functionality
document.getElementById("brand-search").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const brands = JSON.parse(localStorage.getItem("brands")) || [];
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm)
  );
  renderBrands(filteredBrands);
});

function renderBrands(brands) {
  const brandsGrid = document.querySelector(".brands-grid");
  brandsGrid.innerHTML = "";

  if (brands.length === 0) {
    brandsGrid.innerHTML = "<p>No brands found.</p>";
    return;
  }

  brands.forEach((brand) => {
    const brandElement = document.createElement("div");
    brandElement.className = "brand";
    brandElement.innerHTML = `
            <img src="${brand.image}" alt="${brand.name}">
            <h3>${brand.name}</h3>
            <a href="${brand.link}">View Products</a>
        `;
    brandsGrid.appendChild(brandElement);
  });
}
