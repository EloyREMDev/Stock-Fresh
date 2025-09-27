import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query(
    `
    SELECT * FROM invoice
    `,
  );
  return response.rows;
};

const addOne = async (payload) => {
  // Se ha quitado 'products' y se ha añadido 'status' para que coincida con la tabla.
  // La posición de los valores en el array ($1, $2, $3) ahora debe coincidir con el orden en el 'INSERT INTO'.
  const response = await db.query(
    `
    INSERT INTO invoice (client_name, client_phone_number, status)
    VALUES ($1, $2, $3) RETURNING *
  `,
    [payload.client_name, payload.client_phone_number, payload.status],
  );
  return response.rows[0];
};

const deleteOneById = async (invoiceId) => {
  const response = await db.query(
    `
    DELETE FROM invoice
    WHERE id = $1 RETURNING *
  `,
    [invoiceId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La factura no fue encontrada.');
  }
  return response.rows[0];
};

const updateOneById = async (invoiceId, payload) => {
  // Se ha quitado 'products' y se ha añadido 'status' para que coincida con la tabla.
  // El orden de los valores en el array ($1, $2, $3) ahora debe coincidir con el orden en el 'SET'.
  const response = await db.query(
    `
    UPDATE invoice
    SET client_name = $1, client_phone_number = $2, status = $3
    WHERE id = $4 RETURNING *
  `,
    [payload.client_name, payload.client_phone_number, payload.status, invoiceId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La factura no fue encontrada.');
  }
  return response.rows[0];
};

const invoiceRepository = { getAll, addOne, deleteOneById, updateOneById };

export default invoiceRepository;

/////////////
// Importamos la conexion a la base de datos
// import db from '../../db/index.js';
// import { ErrorWithStatus } from '../../utils/errorTypes.js';

/**
 * Obtiene todas las facturas de la base de datos.
 * @returns {Promise<Array>} Un array con todas las facturas.
 */
// const getAll = async () => {
//   const response = await db.query(`
//     SELECT * FROM invoice
//   `);
//   return response.rows;
// };

/**
 * Crea una nueva factura en la base de datos.
 * @param {Object} payload Los datos de la factura a crear.
 * @returns {Promise<Object>} El objeto de la factura creada.
 */
// const addOne = async (payload) => {
//   // Aquí asumimos que el array de productos se guarda como un tipo de dato JSON en la base de datos.
//   const response = await db.query(
//     `
//     INSERT INTO invoice (client_name, client_phone_number, products)
//     VALUES ($1, $2, $3) RETURNING *
//   `,
//     [payload.client_name, payload.client_phone_number, JSON.stringify(payload.products)],
//   );
//   return response.rows[0];
// };

/**
 * Elimina una factura por su ID.
 * @param {number} invoiceId El ID de la factura a eliminar.
 * @returns {Promise<Object>} El objeto de la factura eliminada.
 * @throws {ErrorWithStatus} Si la factura no se encuentra.
 */
// const deleteOneById = async (invoiceId) => {
//   const response = await db.query(
//     `
//     DELETE FROM invoice
//     WHERE id = $1 RETURNING *
//   `,
//     [invoiceId],
//   );
//   if (response.rowCount === 0) {
//     throw new ErrorWithStatus(404, 'La factura no fue encontrada.');
//   }
//   return response.rows[0];
// };

/**
 * Actualiza una factura por su ID.
 * @param {number} invoiceId El ID de la factura a actualizar.
 * @param {Object} payload Los datos de la factura a actualizar.
 * @returns {Promise<Object>} El objeto de la factura actualizado.
 * @throws {ErrorWithStatus} Si la factura no se encuentra.
 */
// const updateOneById = async (invoiceId, payload) => {
//   // Se actualizan todos los campos, incluyendo el array de productos
//   const response = await db.query(
//     `
//     UPDATE invoice
//     SET client_name = $1, client_phone_number = $2, products = $3
//     WHERE id = $4 RETURNING *
//   `,
//     [payload.client_name, payload.client_phone_number, JSON.stringify(payload.products), invoiceId],
//   );
//   if (response.rowCount === 0) {
//     throw new ErrorWithStatus(404, 'La factura no fue encontrada.');
//   }
//   return response.rows[0];
// };

// const invoiceRepository = { getAll, addOne, deleteOneById, updateOneById };

// export default invoiceRepository;
