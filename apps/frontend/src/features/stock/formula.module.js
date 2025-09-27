import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/formula`;

/** * @typedef Formula
 * @type {object}
 * @property {number} id El id de la formula
 * @property {number} product_id El id del producto
 * @property {number} supply_id El id del insumo
 * @property {number} quantity La cantidad de insumo para crear el producto en inventario
*/

/** @type {Formula[]} */
let formulaArray = [];
export const formula = atom(formulaArray);

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

/** * Agrega una formula.
 * @param {object} formulaToCreate La nueva formula
 * @param {number} formulaToCreate.product_id El id del producto
 * @param {number} formulaToCreate.supply_id El id del insumo
 * @param {number} formulaToCreate.quantity La cantidad de insumo para crear el producto en inventario
*/
const addFormula = async (formulaToCreate) => {
  try {
    const formulaCreated = await ky.post(BASE_URL, {json: formulaToCreate, credentials: 'include'}).json();
    formula.set(formula.get().concat(formulaCreated));
    createNotification({title: 'Formula creada!',type: 'success'});
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
        title: 'Formula creada!',
        description: 'La formula se creó con éxito, pero la conexión se perdió. Recarga la página para verlo.',
        type: 'success'
      });
      console.log('Error de conexión inesperado, pero el insumo se creó con éxito:', error);
    }
  }
};

/**
 * Elimina una formula
 * @param {number} id El id de la formula a eliminar
*/
const removeFormula = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const formulaDeleted = await ky.delete(url, { credentials: 'include'}).json();
    formula.set(formula.get().filter(formula => formula.id !== formulaDeleted.id));
    createNotification({
      title: 'Formula eliminada',
      description: `${formulaDeleted.name}`,
      type: 'success'
    });
  } catch (error) {
    handleKyError(error);
  }
}

const getFormula = async () => {
    try {
      const formulaData = await ky.get(BASE_URL, {
        credentials: 'include'
      }).json()
      
      const formattedFormula = formulaData.map(formula => ({
        ...formula,
    }));

    formula.set(formattedFormula);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        location.replace('/login');
      }
      handleKyError(error); // Usa la función de manejo de errores que ya creaste
    }
}

export default {
  addFormula,
  removeFormula,
  getFormula,
}