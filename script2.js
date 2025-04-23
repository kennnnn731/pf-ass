window.onload = function () {
  const order = JSON.parse(localStorage.getItem("order")) || [];
  const totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

  const orderList = document.getElementById("order-list");
  const totalPriceElement = document.getElementById("order-total");

  orderList.innerHTML = "";

  if (order.length === 0) {
    orderList.innerHTML = "<p>No items in your order.</p>";
    return;
  }

  order.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("order-item");
    itemElement.innerHTML = `
      <div class="order-details">
        <h3>${item.name}</h3>
        <p>${item.description || 'No description available'}</p>
        <span class="price">${item.price}</span>
      </div>
      <button class="remove-btn" onclick="removeOrderItem('${item.name}')">
        <i class="fas fa-trash"></i> <!-- Trash can icon -->
      </button>
    `;
    orderList.appendChild(itemElement);
  });

  totalPriceElement.textContent = `₱${totalAmount.toFixed(2)}`;
};

function removeOrderItem(itemName) {
  const order = JSON.parse(localStorage.getItem("order")) || [];
  const totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

  // Remove item from order list
  const updatedOrder = order.filter(item => item.name !== itemName);

  // Update total amount
  const item = order.find(item => item.name === itemName);
  const updatedTotalAmount = totalAmount - parseFloat(item.price.replace('₱', ''));

  // Update localStorage
  localStorage.setItem("order", JSON.stringify(updatedOrder));
  localStorage.setItem("totalAmount", updatedTotalAmount.toString());

  // Reload the page to reflect changes
  window.location.reload();
}

function generateOrderId() {
  return "ORD-" + Math.floor(Math.random() * 1000000);
}

function confirmOrder() {
  const order = JSON.parse(localStorage.getItem("order")) || [];
  const totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;
  const orderId = generateOrderId(); // Automatically generate order ID
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
  
  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  const orderConfirmation = {
    orderId, // Auto-generated Order ID
    order,
    totalAmount,
    paymentMethod: paymentMethod.value
  };

  console.log("Order Confirmed:", orderConfirmation);

  localStorage.setItem("confirmedOrder", JSON.stringify(orderConfirmation)); // Save full details
  localStorage.setItem("confirmedOrderId", orderId); // Keep this if needed elsewhere
  localStorage.removeItem("order");
  localStorage.removeItem("totalAmount");
  
  window.location.href = "index3.html";
  
  alert(`Order confirmed!\nOrder ID: ${orderId}`);
  window.location.href = "index3.html"; // Adjust as needed
}
