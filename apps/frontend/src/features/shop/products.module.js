import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/products`;

/** * @typedef Product
 * @type {object}
 * @property {number} id El id del producto
 * @property {string} name El nombre del producto
 * @property {string} description La descripcion del producto
 * @property {number} price El precio del producto
 * @property {number} price_bs El precio del producto en Bolivares
 * @property {number} quantity La cantidad de productos en inventario
 * @property {number} minimum_stock La cantidad de productos minima que puede haber en inventario
 * @property {string} image La URL de la imagen del producto
 * @property {string} manufacturer El fabricante del producto
*/

/** @type {Product[]} */
let productsArray = [];
export const products = atom(productsArray);

const handleKyError = async (error) => {
  console.log(error);
  if (error.response) {
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  } else {
    createNotification({
      title: 'Ups! Hubo un error',
      description: 'No se pudo conectar con el servidor. Por favor, revisa tu conexión.',
      type: 'error'
    });
  }
};

/** * Agrega un producto.
 * @param {object} productToCreate El nuevo producto
 * @param {string} productToCreate.name El nombre del producto
 * @param {string} productToCreate.description La descripcion del producto
 * @param {number} productToCreate.price El precio del producto
 * @param {number} productToCreate.price_bs El precio del producto en Bolivares
 * @param {number} productToCreate.quantity La cantidad de productos
 * @param {number} productToCreate.minimum_stock La cantidad de productos minima que puede haber en inventario
 * @param {string} productToCreate.image La URL de la imagen
 * @param {string} productToCreate.manufacturer El fabricante
*/
const addProduct = async (productToCreate) => {
  try {
    const productCreated = await ky.post(BASE_URL, {json: productToCreate, credentials: 'include'}).json();
    products.set(products.get().concat(productCreated));
    createNotification({title: 'Producto creado!',type: 'success'});
  } catch (error) {
    if (error.name === 'HTTPError' && error.response.status >= 400) {
      const errorData = await error.response.json();
      createNotification({
        title: 'Ups! Hubo un error',
        description: errorData.error,
        type: 'error'
      });
    } else {
      createNotification({
        title: 'Producto creado!',
        description: 'El producto se creó con éxito, pero la conexión se perdió. Recarga la página para verlo.',
        type: 'success'
      });
      console.log('Error de conexión inesperado, pero el producto se creó con éxito:', error);
    }
  }
};

/**
 * Elimina un producto
 * @param {number} id El id del producto a eliminar
*/
const removeProduct = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const productDeleted = await ky.delete(url, { credentials: 'include'}).json();
    products.set(products.get().filter(product => product.id !== productDeleted.id));
    createNotification({
      title: 'Producto eliminado',
      description: `${productDeleted.name}`,
      type: 'success'
    });
  } catch (error) {
    handleKyError(error);
  }
}

/**
 * Actualiza un producto
 * @param {Product} productToUpdate
*/
const updateProduct = async (productToUpdate) => {
  const url = `${BASE_URL}/${productToUpdate.id}`;
  try {
    const productUpdated = await ky.put(url, {json: productToUpdate, credentials: 'include'}).json();
    products.set(products.get().map(product => {
      if (product.id === productUpdated.id) {
        return productUpdated;
      } else {
        return product;
      }
    }));
    createNotification({
      title: 'Producto actualizado',
      description: `${productUpdated.name}`,
      type: 'success'
    });
  } catch (error) {
    handleKyError(error);
  }
}



export const getProducts = async () => {
  try {
    const response = await fetch(`${BACK_ENDPOINT}/api/products`);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getProducts:', error);
    return [];
  }
};

// Nueva variable para la tasa de cambio
export const dolarRate = atom(0);

// Nueva función para obtener la tasa de cambio
const getDolarRate = async () => {
    try {
        const url = `${BACK_ENDPOINT}/api/dolar/rate`;
        const response = await ky.get(url).json();
        console.log('Respuesta de la API del dólar:', response)
        dolarRate.set(response.promedio);
    } catch (error) {
        handleKyError(error);
    }
};

export default {
  addProduct,
  removeProduct,
  updateProduct,
  getProducts,
  getDolarRate
}
