import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/supply`;

/** * @typedef Supply
 * @type {object}
 * @property {number} id El id del insumo
 * @property {string} name El nombre del insumo
 * @property {number} quantity La cantidad de insumos en inventario
 * @property {number} minimum_stock La cantidad de insumos minima que puede haber en inventario
 * @property {string} supplier El fabricante del insumo
*/

/** @type {Supply[]} */
let supplyArray = [];
export const supply = atom(supplyArray);

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

/** * Agrega un insumo.
 * @param {object} supplyToCreate El nuevo insumo
 * @param {string} supplyToCreate.name El nombre del insumo
 * @param {number} supplyToCreate.quantity La cantidad de insumos
 * @param {number} supplyToCreate.minimum_stock La cantidad de insumos minima que puede haber en inventario
 * @param {string} supplyToCreate.supplier El fabricante
*/
const addSupply = async (supplyToCreate) => {
  try {
    const supplyCreated = await ky.post(BASE_URL, {json: supplyToCreate, credentials: 'include'}).json();
    supply.set(supply.get().concat(supplyCreated));
    createNotification({title: 'Insumo creado!',type: 'success'});
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
        title: 'Insumo creado!',
        description: 'El insumo se creó con éxito, pero la conexión se perdió. Recarga la página para verlo.',
        type: 'success'
      });
      console.log('Error de conexión inesperado, pero el insumo se creó con éxito:', error);
    }
  }
};

/**
 * Elimina un insumo
 * @param {number} id El id del insumo a eliminar
*/
const removeSupply = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const supplyDeleted = await ky.delete(url, { credentials: 'include'}).json();
    supply.set(supply.get().filter(supply => supply.id !== supplyDeleted.id));
    createNotification({
      title: 'Insumo eliminado',
      description: `${supplyDeleted.name}`,
      type: 'success'
    });
  } catch (error) {
    handleKyError(error);
  }
}

/**
 * Actualiza un insumo
 * @param {Supply} supplyToUpdate
*/
const updateSupply = async (supplyToUpdate) => {
  const url = `${BASE_URL}/${supplyToUpdate.id}`;
  try {
    const supplyUpdated = await ky.put(url, {json: supplyToUpdate, credentials: 'include'}).json();
    supply.set(supply.get().map(supply => {
      if (supply.id === supplyUpdated.id) {
        return supplyUpdated;
      } else {
        return supply;
      }
    }));
    createNotification({
      title: 'Insumo actualizado',
      description: `${supplyUpdated.name}`,
      type: 'success'
    });
  } catch (error) {
    handleKyError(error);
  }
}

const getSupply = async () => {
    try {
      const supplyData = await ky.get(BASE_URL, {
        credentials: 'include'
      }).json()
      
      const formattedSupply = supplyData.map(supply => ({
        ...supply,
    }));

    supply.set(formattedSupply);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        location.replace('/login');
      }
      handleKyError(error); // Usa la función de manejo de errores que ya creaste
    }
}

export default {
  addSupply,
  removeSupply,
  updateSupply,
  getSupply,
}
