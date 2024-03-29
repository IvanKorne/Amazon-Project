import { addToCart, updateCartQuantity, addedNoti } from "../data/cart.js";
import { productsData } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";

//Adding Body to HTML
productsData.forEach((product) => {
  productsHTML += `<div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src="${product.image}"
      />
    </div>

    <div class="product-name two-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img
        class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png"
      />
      <div class="product-rating-count link-primary">${
        product.rating.count
      }</div>
    </div>

    <div class="product-price">$${formatCurrency(product.priceCents)}</div>

    <div class="product-quantity-container">
      <select class='js-quantity-select-${product.id}'>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-${product.id}">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-cart" data-product-id ="${
      product.id
    }">Add to Cart</button>
  </div>`;
});

// Puts the HTML onto the website using DOM format.
document.querySelector(".js-products-grid").innerHTML = productsHTML;
updateCartQuantity("cart-quantity");

let addButtons = document.querySelectorAll(`.js-add-cart`);
const timeoutList = {};

//Actions whenever add-to-cart button is pressed.
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    addToCart(productId);
    updateCartQuantity("cart-quantity");
    addedNoti(productId, timeoutList);
  });
});
