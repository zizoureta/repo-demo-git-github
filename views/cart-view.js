export function renderCartView(state) {
  const cartItems = state.cart.length === 0
    ? '<p class="empty">Todavía no hay nada acá.<br>Sumá un par y empezá el recorrido.</p>'
    : state.cart.map((product) => `
      <div class="cart-row">
        <img src="${product.imagen}" alt="${product.nombre}">
        <div><strong>${product.nombre}</strong><small>${formatCartPrice(product.precio)}</small></div>
        <button class="remove" type="button" data-remove-product-id="${product.id}">Quitar</button>
      </div>
    `).join('');

  return {
    itemsHtml: cartItems,
    count: state.cart.length,
    total: formatCartPrice(state.cart.reduce((total, product) => total + product.precio, 0))
  };
}

function formatCartPrice(price) {
  return `$${price.toLocaleString('es-AR')}`;
}
