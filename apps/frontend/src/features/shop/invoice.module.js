import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/invoice`;

/** * @typedef Invoice
 * @type {object}
 * @property {number} id El id de la factura
 * @property {string} client_name El nombre del cliente
 * @property {string} client_phone_number El numero del cliente
 * @property {string} status El estado de la factura
*/

/** @type {Invoice[]} */
let invoiceArray = [];
export const invoice = atom(invoiceArray);

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

/** * Agrega una factura.
 * @param {object} invoiceToCreate La nueva factura
 * @param {string} invoiceToCreate.client_name El nombre del cliente
 * @param {string} invoiceToCreate.client_phone_number El numero del cliente
 * @param {string} invoiceToCreate.status El estado de la factura
*/
export const addInvoice = async (invoiceToCreate) => {
  try {
    const invoiceCreated = await ky.post(BASE_URL, {json: invoiceToCreate, credentials: 'include'}).json();
    invoice.set(invoice.get().concat(invoiceCreated));
    createNotification({title: 'Factura creada!',type: 'success'});
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
        title: 'Factura creada!',
        description: 'La factura se creó con éxito, pero la conexión se perdió. Recarga la página para verlo.',
        type: 'success'
      });
      console.log('Error de conexión inesperado, pero la factura se creó con éxito:', error);
    }
  }
};

/**
 * Elimina una factura
 * @param {number} id El id de la factura a eliminar
*/
const removeInvoice = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const invoiceDeleted = await ky.delete(url, { credentials: 'include'}).json();
    invoice.set(invoice.get().filter(invoice => invoice.id !== invoiceDeleted.id));
    createNotification({
      title: 'Factura eliminada',
      description: `${invoiceDeleted.name}`,
      type: 'success'
    });
  } catch (error) {
    handleKyError(error);
  }
}

/**
 * Actualiza una factura
 * @param {Invoice} invoiceToUpdate
*/
export const updateInvoice = async (invoiceToUpdate) => {
  const url = `${BASE_URL}/${invoiceToUpdate.id}`;
  try {
    const invoiceUpdated = await ky.put(url, {json: invoiceToUpdate, credentials: 'include'}).json();
    invoice.set(invoice.get().map(invoice => {
      if (invoice.id === invoiceUpdated.id) {
        return invoiceUpdated;
      } else {
        return invoice;
      }
    }));
    createNotification({
      title: 'Factura actualizada',
      description: `${invoiceUpdated.name}`,
      type: 'success'
    });
  } catch (error) {
    handleKyError(error);
  }
}



export const getInvoice = async () => {
  try {
    const response = await fetch(`${BACK_ENDPOINT}/api/invoice`);
    if (!response.ok) {
      throw new Error('Error al obtener las facturas');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getInvoice:', error);
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
  addInvoice,
  removeInvoice,
  updateInvoice,
  getInvoice,
  getDolarRate
}