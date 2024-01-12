import {
  cart,
  removeItem,
  updateCartQuantity,
  saveUpdate,
  updateDelivery,
} from "../../data/cart.js";
import { productsData } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/delivery.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderOrder() {
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

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    checkoutHTML += `<div class="cart-item-container js-cart-container-${
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
    document.body.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        saveUpdate(saveButton);
      }
    });
  });

  //Adding time and delivery options
  function displayOptions(matchingItem, cartItem) {
    let deliveryHTML = "";

    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
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
    });
  });
}
