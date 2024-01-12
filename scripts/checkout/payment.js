import { cart } from "../../data/cart.js";
import { getMatch } from "../../data/products.js";
import { getDelivery } from "../../data/delivery.js";
import { formatCurrency } from "../utils/money.js";

export function renderPayment() {
  let productPrice = 0;
  let shippingPrice = 0;
  cart.forEach((item) => {
    const match = getMatch(item.productId);
    productPrice += match.priceCents * item.quantity;

    const deliveryOption = getDelivery(item.deliveryOptionId);
    shippingPrice += deliveryOption.priceCents;
  });

  const preTax = shippingPrice + productPrice;
  const tax = 0.1 * preTax;
  const total = preTax + tax;

  let paymentHTML = ` <div class="payment-summary-title">Order Summary</div>

  <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money">$${formatCurrency(productPrice)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(preTax)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(tax)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(total)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>`;

  document.querySelector(".js-payment").innerHTML = paymentHTML;
}
