import { createCatalogController } from './controllers/catalog-controller.js';
import { createCartController } from './controllers/cart-controller.js';

const catalogElement = document.querySelector('.products');
const cartItemsElement = document.querySelector('.cart-items');
const cartCountElement = document.querySelector('.cart-count');
const cartTotalElement = document.querySelector('.cart-total span:last-child');
const cartDrawerElement = document.querySelector('#cart-drawer');
const cartTriggerElement = document.querySelector('.cart-trigger');
const cartCloseElement = document.querySelector('.close');
const noticeElement = document.querySelector('.notice');

function renderCatalogHtml(catalogHtml) {
  catalogElement.innerHTML = catalogHtml;
}

function renderCartHtml(cartView) {
  cartItemsElement.innerHTML = cartView.itemsHtml;
  cartCountElement.textContent = cartView.count;
  cartTotalElement.textContent = cartView.total;
}

function showNotice(message) {
  noticeElement.textContent = message;
  noticeElement.classList.add('show');
  window.setTimeout(() => noticeElement.classList.remove('show'), 1800);
}

function openCart() {
  cartDrawerElement.classList.add('open');
  cartDrawerElement.setAttribute('aria-hidden', 'false');
  cartTriggerElement.setAttribute('aria-expanded', 'true');
}

function closeCart() {
  cartDrawerElement.classList.remove('open');
  cartDrawerElement.setAttribute('aria-hidden', 'true');
  cartTriggerElement.setAttribute('aria-expanded', 'false');
}

const cartController = createCartController(renderCartHtml);
const catalogController = createCatalogController(renderCatalogHtml);

catalogElement.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add-product-id]');
  if (!addButton) {
    return;
  }

  cartController.handleCatalogClick(Number(addButton.dataset.addProductId), catalogController.findProductById);
  showNotice('Producto agregado al carrito');
});

cartItemsElement.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove-product-id]');
  if (removeButton) {
    cartController.handleCartClick(Number(removeButton.dataset.removeProductId));
  }
});

cartTriggerElement.addEventListener('click', openCart);
cartCloseElement.addEventListener('click', closeCart);
catalogController.loadCatalog();
