export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

// Adds to cart
export function addToCart(productId) {
  let addProduct;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      addProduct = cartItem;
    }
  });

  const quantity = Number(
    document.querySelector(`.js-quantity-select-${productId}`).value
  );

  if (addProduct) {
    addProduct.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }
}

// updates the cart quantity on the top of page
export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
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
