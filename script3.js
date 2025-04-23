const orderData = JSON.parse(localStorage.getItem("confirmedOrder"));

if (!orderData) {
  document.body.innerHTML = "<h2>No confirmed order found.</h2>";
  throw new Error("No order found.");
}

document.getElementById("orderId").textContent = orderData.orderId;
document.getElementById("paymentMethod").textContent = orderData.paymentMethod;

const itemsContainer = document.getElementById("itemsContainer");
let total = 0;

orderData.order.forEach(item => {
  const itemDiv = document.createElement("div");
  itemDiv.className = "item";

  const price = parseFloat(item.price.replace("₱", "")) || parseFloat(item.price);
  const qty = item.qty || 1;
  const itemTotal = price * qty;

  itemDiv.innerHTML = `
    <span>${qty}x ${item.name}</span>
    <span>₱${itemTotal.toFixed(2)}</span>
  `;

  itemsContainer.appendChild(itemDiv);
  total += itemTotal;
});

document.getElementById("totalAmount").textContent = `₱${total.toFixed(2)}`;
s