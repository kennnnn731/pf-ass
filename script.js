const menuItems = {
    Chickenjoy: [
      { name: "Classic Chickenjoy", price: "₱99", description: "Crispy fried chicken" },
      { name: "Spicy Chickenjoy", price: "₱99", description: "Spicy crispy fried chicken" }
    ],
    Burgers: [
      { name: "Chicken Burger", price: "₱85", description: "Juicy chicken patty with fresh toppings" },
      { name: "Cheese Burger", price: "₱95", description: "Beef patty with melted cheese" },
      { name: "Patty Burger", price: "₱90", description: "Tender beef patty with all the fixings" }
    ],
    SpaghettiPalabok: [
      { name: "Spaghetti", price: "₱75", description: "Classic Filipino-style spaghetti" },
      { name: "Palabok", price: "₱80", description: "Rice noodles with savory pork and shrimp" }
    ],
    Breakfast: [
      { name: "Longsilog", price: "₱120", description: "Longganisa with garlic rice and egg" },
      { name: "Tapsilog", price: "₱130", description: "Beef tapa with garlic rice and egg" }
    ],
    Drinks: [
      { name: "Pineapple", price: "₱50" },
      { name: "Nestea", price: "₱50" }
    ],
    Coffee: [
      { name: "Black Coffee", price: "₱75" },
      { name: "Cold Black Coffee", price: "₱90" },
      { name: "Regular Coffee", price: "₱80" }
    ],
    Desserts: [
      { name: "Peach Mango Pie", price: "₱75" },
      { name: "Sundae", price: "₱75" },
      { name: "Halo-Halo", price: "₱99" }
    ],
    FriesSides: [
      { name: "Large Fries", price: "₱99" },
      { name: "Small Fries", price: "₱75" }
    ]
};

const orderList = []; // To store the selected orders
let totalAmount = 0;  // To store the total amount

// Function to filter menu items based on category
function filterMenu(category) {
  const menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = "";

  const items = menuItems[category];

  if (items) {
    items.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("menu-item");

      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <strong>Price: ${item.price}</strong>
        <br>
        <button onclick="addToOrder('${item.name}', '${item.price}')">Add to Order</button>
      `;

      menuContainer.appendChild(itemElement);
    });
  } else {
    menuContainer.innerHTML = "<p>No items available for this category.</p>";
  }
}

// Function to add selected item to the order list
function addToOrder(name, price) {
  // Convert price from string to number for calculation
  const priceNum = parseFloat(price.replace('₱', ''));

  // Add item to the order list
  orderList.push({ name, price });

  // Add item to the displayed order list
  const orderListElement = document.getElementById("order-list");
  const li = document.createElement("li");
  li.textContent = `${name} - ${price}`;
  orderListElement.appendChild(li);

  // Update total amount
  totalAmount += priceNum;

  // Update total display
  document.getElementById("total-amount").textContent = `Total: ₱${totalAmount.toFixed(2)}`;
}

// Clear previous orders from localStorage
localStorage.removeItem('orders');

// Function to proceed to checkout
function goToCheckout() {
    // Save the order in localStorage to use on the checkout page
    localStorage.setItem("order", JSON.stringify(orderList)); // Store the order
    localStorage.setItem("totalAmount", totalAmount.toString()); // Store the total amount
  
    // Redirect to the checkout page
    window.location.href = "index2.html"; // Ensure this path is correct
}


  
