export function renderCatalogView(products) {
  return products.map((product) => `
    <article class="product" data-product-id="${product.id}">
      <img class="product-image" src="${product.imagen}" alt="${product.nombre}">
      <div class="product-info">
        <h3>${product.nombre}</h3>
        <div class="product-bottom">
          <span class="price">${formatProductPrice(product.precio)}</span>
          <button class="add" type="button" data-add-product-id="${product.id}">Agregar</button>
        </div>
      </div>
    </article>
  `).join('');
}

function formatProductPrice(price) {
  return `$${price.toLocaleString('es-AR')}`;
}

export function renderCatalogErrorView(message) {
  return `<p class="catalog-status">${message}</p>`;
}
