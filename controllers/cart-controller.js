import { dispatch, getState, subscribe } from '../state/store.js';
import { renderCartView } from '../views/cart-view.js';

export function createCartController(onCartRendered) {
  subscribe((state) => onCartRendered(renderCartView(state)));
  onCartRendered(renderCartView(getState()));

  function addProductToCart(product) {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }

  function removeProductFromCart(productId) {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  }

  function handleCatalogClick(productId, findProductById) {
    const product = findProductById(productId);
    if (product) {
      addProductToCart(product);
    }
  }

  function handleCartClick(productId) {
    removeProductFromCart(productId);
  }

  return { handleCatalogClick, handleCartClick, addProductToCart };
}
