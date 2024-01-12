import {
  cart,
  removeItem,
  updateCartQuantity,
  saveUpdate,
} from "../data/cart.js";
import { productsData } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let checkoutHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // Generate the correct item to display
  let matchingItem;
  productsData.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });
  checkoutHTML += `<div class="cart-item-container js-cart-container-${
    matchingItem.id
  }">
    <div class="delivery-date">Delivery date: Wednesday, June 15</div>

    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingItem.image}"
      />

      <div class="cart-item-details">
        <div class="product-name">${matchingItem.name}</div>
        <div class="product-price">$${formatCurrency(
          matchingItem.priceCents
        )}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label js-quantity">${
            cartItem.quantity
          }</span> </span>
          <span class="update-quantity-link link-primary js-update" data-product-id ="${
            matchingItem.id
          }">
            Update
          </span>
          <input class='quantity-input js-quantity-${matchingItem.id}'>
          <span class='save-quantity-link link-primary js-save' data-product-id ="${
            matchingItem.id
          }">Save</span>
          <span class="delete-quantity-link link-primary js-delete" data-product-id ="${
            matchingItem.id
          }">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}"
          />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            checked
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}"
          />
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}"
          />
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

// Puts HTML into checkout page via DOM
document.querySelector(".js-order").innerHTML = checkoutHTML;
updateCartQuantity("items");

//Makes Delte buttons interactive
let deleteButtons = document.querySelectorAll(".js-delete");
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    const { productId } = deleteButton.dataset;
    removeItem(productId);

    const containter = document.querySelector(
      `.js-cart-container-${productId}`
    );
    containter.remove();
    updateCartQuantity("items");
  });
});

let updateButtons = document.querySelectorAll(".js-update");
updateButtons.forEach((updateButton) => {
  updateButton.addEventListener("click", () => {
    const { productId } = updateButton.dataset;
    const container = document.querySelector(`.js-cart-container-${productId}`);
    container.classList.add("is-editing-quantity");
  });
});

let saveButtons = document.querySelectorAll(".js-save");
saveButtons.forEach((saveButton) => {
  saveButton.addEventListener("click", () => {
    saveUpdate(saveButton);
  });
  document.body.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveUpdate(saveButton);
    }
  });
});
