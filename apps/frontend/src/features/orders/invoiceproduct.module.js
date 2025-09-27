import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/invoiceProducts`;

/** * @typedef InvoiceProduct
 * @type {object}
 * @property {number} id El id de la factura del producto
 * @property {number} product_id El id del producto
 * @property {number} invoice_id El id de la factura
 * @property {number} quantity La cantidad de productos en factura
*/

/** @type {InvoiceProduct[]} */
let invoiceProductsArray = [];
export const invoiceProducts = atom(invoiceProductsArray);

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

/** * Agrega un producto a la factura.
 * @param {object} invoiceProductToCreate El nuevo producto en factura
 * @param {number} invoiceProductToCreate.product_id El id del producto
 * @param {number} invoiceProductToCreate.invoice_id El id de la factura
 * @param {number} invoiceProductToCreate.quantity La cantidad de productos en factura
*/
export const addInvoiceProduct = async (invoiceProductToCreate) => {
  try {
    const invoiceProductCreated = await ky.post(BASE_URL, {json: invoiceProductToCreate, credentials: 'include'}).json();
    invoiceProducts.set(invoiceProducts.get().concat(invoiceProductCreated));
    createNotification({title: 'Producto agregado a factura!',type: 'success'});
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
        title: 'Producto agregado a factura!',
        description: 'El producto se agrego a la factura con éxito, pero la conexión se perdió. Recarga la página para verlo.',
        type: 'success'
      });
      console.log('Error de conexión inesperado, pero el producto se agrego con éxito:', error);
    }
  }
};

/**
 * Elimina un producto de la factura
 * @param {number} id El id del producto a eliminar
*/
const removeInvoiceProduct = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const invoiceProductDeleted = await ky.delete(url, { credentials: 'include'}).json();
    invoiceProducts.set(invoiceProducts.get().filter(invoiceProducts => invoiceProducts.id !== invoiceProductDeleted.id));
    createNotification({
      title: 'Producto eliminado de la factura',
      description: `${productDeleted.name}`,
      type: 'success'
    });
  } catch (error) {
    handleKyError(error);
  }
}

/**
 * Actualiza un producto
 * @param {InvoiceProduct} invoiceProductToUpdate
*/
export const updateInvoiceProduct = async (invoiceProductToUpdate) => {
  const url = `${BASE_URL}/${invoiceProductToUpdate.id}`;
  try {
    const invoiceProductUpdated = await ky.put(url, {json: invoiceProductToUpdate, credentials: 'include'}).json();
    invoiceProducts.set(invoiceProducts.get().map(invoiceProduct => {
      if (invoiceProduct.id === invoiceProductUpdated.id) {
        return invoiceProductUpdated;
      } else {
        return invoiceProduct;
      }
    }));
    createNotification({
      title: 'Producto actualizado',
      description: `${invoiceProductUpdated.name}`,
      type: 'success'
    });
  } catch (error) {
    handleKyError(error);
  }
}



export const getInvoiceProducts = async () => {
  try {
    const response = await fetch(`${BACK_ENDPOINT}/api/invoiceProducts`);
    if (!response.ok) {
      throw new Error('Error al obtener los productos de la factura');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getInvoiceProducts:', error);
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
  addInvoiceProduct,
  removeInvoiceProduct,
  updateInvoiceProduct,
  getInvoiceProducts,
  getDolarRate
}