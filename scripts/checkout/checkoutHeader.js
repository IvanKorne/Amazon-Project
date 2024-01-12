import { cart } from "../../data/cart.js";

export function renderHeader() {
  let cartAmount = 0;

  cart.forEach((item) => {
    cartAmount += item.quantity;
  });

  let headerHTML = `
  <div class="header-content">
    <div class="checkout-header-left-section">
      <a href="amazon.html">
        <img class="amazon-logo" src="images/amazon-logo.png" />
        <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png" />
      </a>
    </div>

    <div class="checkout-header-middle-section">
      Checkout (<a class="return-to-home-link" href="amazon.html">${cartAmount} items</a>)
    </div>

    <div class="checkout-header-right-section">
      <img src="images/icons/checkout-lock-icon.png" />
    </div>
  </div>;`;

  document.querySelector(".js-header").innerHTML = headerHTML;
}
