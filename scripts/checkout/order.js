import {
  cart,
  removeItem,
  saveUpdate,
  updateDelivery,
} from "../../data/cart.js";
import { productsData, getMatch } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDelivery, getDate } from "../../data/delivery.js";
import { renderPayment } from "./payment.js";
import { renderHeader } from "./checkoutHeader.js";

export function renderOrder() {
  let checkoutHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Generate the correct item to display
    const matchingItem = getMatch(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDelivery(deliveryOptionId);

    const dateString = getDate(deliveryOption);

    checkoutHTML += `<div class="cart-item-container js-cart-container js-cart-container-${
      matchingItem.id
    }">
      <div class="delivery-date">Delivery date: ${dateString}</div>
  
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
          <div class="product-quantity js-product-quantitiy-${matchingItem.id}">
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
          <div class="delivery-options-title js">
            Choose a delivery option:
          </div>
          ${displayOptions(matchingItem, cartItem)}   
        </div>
      </div>
    </div>`;
  });

  // Puts HTML into checkout page via DOM
  document.querySelector(".js-order").innerHTML = checkoutHTML;

  //Makes Delete buttons interactive
  let deleteButtons = document.querySelectorAll(".js-delete");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const { productId } = deleteButton.dataset;
      removeItem(productId);

      renderPayment();
      renderHeader();
      renderOrder();
    });
  });

  //Update and Save buttons
  let updateButtons = document.querySelectorAll(".js-update");
  updateButtons.forEach((updateButton) => {
    updateButton.addEventListener("click", () => {
      const { productId } = updateButton.dataset;
      const container = document.querySelector(
        `.js-cart-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  let saveButtons = document.querySelectorAll(".js-save");
  saveButtons.forEach((saveButton) => {
    saveButton.addEventListener("click", () => {
      saveUpdate(saveButton);
    });
  });

  //Adding time and delivery options
  function displayOptions(matchingItem, cartItem) {
    let deliveryHTML = "";

    deliveryOptions.forEach((option) => {
      const dateString = getDate(option);
      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(option.priceCents)} -`;

      const isCheck = option.id === cartItem.deliveryOptionId;
      deliveryHTML += `
      <div class="delivery-option js-delivery" data-product-id="${
        matchingItem.id
      }" data-delivery-option-id="${option.id}">
      <input
        type="radio"
        ${isCheck ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${matchingItem.id}"
      />
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
      </div>
    </div>`;
    });

    return deliveryHTML;
  }

  document.querySelectorAll(".js-delivery").forEach((delivery) => {
    delivery.addEventListener("click", () => {
      const { productId, deliveryOptionId } = delivery.dataset;

      updateDelivery(productId, deliveryOptionId);
      renderOrder();
      renderPayment();
    });
  });
}
