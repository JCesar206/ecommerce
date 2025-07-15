const products = [
    {id:1, name: "Air Pods", price: 2998.99, stock: 15, units: 0, image: "./images/airPods.jpg"},
    {id:2, name: "Smart Band", price: 701.24, stock: 30, units: 0, image: "./images/smartBand.jpg"},
    {id:3, name: "Smart Watch", price: 2199.00, stock: 18, units: 0, image: "./images/smartWatch.jpg"},
    {id:4, name: "Tablet", price: 4727.07, stock: 19, units: 0, image: "./images/tablet.jpg"},
    {id:5, name: "Smart TV", price: 4399.00, stock: 14, units: 0, image: "./images/tv.jpg"},
    {id:6, name: "Xbox Serie S", price: 6299.00, stock: 23, units: 0, image: "./images/xbox.jpg"},
    {id:7, name: "Play Station 5", price: 9999.00, stock: 20, units: 0, image: "./images/playStation5.jpg"},
    {id:8, name: "Nintendo Switch", price: 7799.00, stock: 18, units: 0, image: "./images/nintendoSwitch2.jpg"},
    {id:9, name: "Laptop", price: 8199.00, stock: 19, units: 0, image: "./images/laptop.jpg"},
    {id:10, name: "Smart Phone", price: 9499.99, stock: 15, units: 0, image: "./images/smartPhone.jpg"},
    {id:11, name: "AMD Ryzen 7", price: 2809.00, stock: 9, units: 0, image: "./images/amdRyzen7.jpg"},
    {id:12, name: "Intel 7 Ultra", price: 7847.93, stock: 18, units: 0, image: "./images/intelCore7Ultra.jpg"},
    {id:13, name: "Intel 7 Ultra", price: 21873.00, stock: 5, units: 0, image: "./images/laptopGamer.jpg"},
    {id:14, name: "Intel 7 Ultra", price: 599.00, stock: 15, units: 0, image: "./images/tecladoGamer.jpg"}
];

let cart = {};
let total = 0;

function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>Precio: $${product.price}</p>
      <p>Stock: <span id="stock-${product.id}">${product.stock}</span></p>
      <div class="quantity-controls">
        <button onclick="removeUnit(${product.id})" id="btnMenos">-</button>
        <span id="qty-${product.id}">0</span>
        <button onclick="addUnit(${product.id})" id="btnMas">+</button>
      </div>
    `;

    container.appendChild(div);
  });
}

function addUnit(id) {
  const product = products.find(p => p.id === id);
  if (!cart[id]) cart[id] = 0;
  if (cart[id] < product.stock) {
    cart[id]++;
    total += product.price;
    updateDisplay(id);
  } else {
    alert("No hay más stock disponible.");
  }
}

function removeUnit(id) {
  const product = products.find(p => p.id === id);
  if (cart[id] && cart[id] > 0) {
    cart[id]--;
    total -= product.price;
    updateDisplay(id);
  }
}

function updateDisplay(id) {
  document.getElementById(`qty-${id}`).textContent = cart[id];
  document.getElementById("total").textContent = total.toFixed(2);
}

function pay() {
  if (total === 0) {
    alert("No has agregado productos al carrito.");
    return;
  }

  for (let id in cart) {
    const product = products.find(p => p.id === parseInt(id));
    product.stock -= cart[id];
    cart[id] = 0;
  }

  total = 0;
  alert("Gracias por tu compra!");
  renderProducts();
  document.getElementById("total").textContent = "0.00";
}

window.onload = renderProducts;
