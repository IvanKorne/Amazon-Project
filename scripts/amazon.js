import { cart } from "../data/cart.js";
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

    <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

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

//Puts the HTML onto the website using DOM format.
document.querySelector(".js-products-grid").innerHTML = productsHTML;

//Add to cart

let addButtons = document.querySelectorAll(`.js-add-cart`);
const addTimeouts = {};

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    const addMsg = document.querySelector(`.js-added-${productId}`);
    addMsg.classList.add("add-button-update");

    setTimeout(() => {
      const prevTimeout = addTimeouts[productId];
      if (prevTimeout) {
        clearTimeout(prevTimeout);
      }

      const nowTimeout = setTimeout(() => {
        addMsg.classList.remove("add-button-update");
      }, 2000);

      addTimeouts[productId] = nowTimeout;
    });

    let addProduct;

    cart.forEach((product) => {
      if (productId === product.productId) {
        addProduct = product;
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

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  });
});
