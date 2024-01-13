import { renderOrder } from "../scripts/checkout/order.js";
import { renderPayment } from "../scripts/checkout/payment.js";
import { renderHeader } from "../scripts/checkout/checkoutHeader.js";

export let cart;
loadFromStorage();
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

// Adds to cart
export function addToCart(productId) {
  let addProduct;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      addProduct = cartItem;
    }
  });

  /*const quantity = Number(
    document.querySelector(`.js-quantity-select-${productId}`).value
  );*/

  if (addProduct) {
    addProduct.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveStorage();
}

// updates the cart quantity on the top of page
export function updateCartQuantity(title) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(`.js-${title}`).innerHTML = cartQuantity;
}

//Adds a notification each time an item is added
export function addedNoti(productId, timeoutList) {
  const addMsg = document.querySelector(`.js-added-${productId}`);
  addMsg.classList.add("add-button-update");

  setTimeout(() => {
    const prevTimeout = timeoutList[productId];
    if (prevTimeout) {
      clearTimeout(prevTimeout);
    }

    const nowTimeout = setTimeout(() => {
      addMsg.classList.remove("add-button-update");
    }, 2000);

    timeoutList[productId] = nowTimeout;
  });
}

export function removeItem(productId) {
  const newCart = [];
  /*cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
       newCart.push(cartItem);
    }
  });*/
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      continue;
    }
    newCart.push(cart[i]);
  }
  cart = newCart;
  saveStorage();
}

function saveStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function calcCartQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveStorage();
}

export function saveUpdate(saveButton) {
  const { productId } = saveButton.dataset;
  const container = document.querySelector(`.js-cart-container-${productId}`);
  const amount = Number(
    document.querySelector(`.js-quantity-${productId}`).value
  );
  if (amount < 0 || amount >= 100) {
    alert("Quantity must be at least 0 and less than 100");
    return;
  }
  container.classList.remove("is-editing-quantity");
  calcCartQuantity(productId, amount);
  renderOrder();
  renderPayment();
  renderHeader();
}

export function updateDelivery(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveStorage();
}
