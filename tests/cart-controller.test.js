import { beforeEach, describe, expect, it } from 'vitest';
import { createCartController } from '../controllers/cart-controller.js';
import { dispatch, getState } from '../state/store.js';

function clearCart() {
  while (getState().cart.length > 0) {
    dispatch({ type: 'REMOVE_FROM_CART', payload: getState().cart[0].id });
  }
}

describe('cart-controller', () => {
  beforeEach(clearCart);

  it('actualiza el total al despachar ADD_TO_CART', () => {
    const renderedCarts = [];
    const cartController = createCartController((cartView) => renderedCarts.push(cartView));
    const product = { id: 1, nombre: 'Orbit Runner', precio: 89999, imagen: 'orbit.jpg', stock: 12 };

    cartController.addProductToCart(product);

    expect(renderedCarts.at(-1).total).toBe('$89.999');
    expect(getState().cart).toHaveLength(1);
  });
});
