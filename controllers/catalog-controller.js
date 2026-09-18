import { Product } from '../models/product.js';
import { renderCatalogErrorView, renderCatalogView } from '../views/catalog-view.js';

const catalogEndpoint = 'api/products.json';

export function createCatalogController(onCatalogRendered) {
  let products = [];

  async function loadCatalog() {
    try {
      const response = await fetch(catalogEndpoint);
      if (!response.ok) {
        throw new Error(`No se pudo cargar el catálogo: ${response.status}`);
      }

      const productData = await response.json();
      products = productData.map((data) => new Product(data));
      onCatalogRendered(renderCatalogView(products));
    } catch (error) {
      onCatalogRendered(renderCatalogErrorView(error.message));
    }
  }

  function findProductById(productId) {
    return products.find((product) => product.id === productId);
  }

  return { loadCatalog, findProductById };
}
