import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query(
    `
    SELECT * FROM invoice_product 
   `,
  );
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
     INSERT INTO invoice_product (product_id, invoice_id, quantity)
     VALUES ($1, $2, $3) RETURNING *
   `,
    [payload.product_id, payload.invoice_id, payload.quantity],
  );
  return response.rows[0];
};

const deleteOneById = async (id) => {
  const response = await db.query(
    `
    DELETE FROM invoice_product
    WHERE id = $1 RETURNING *
  `,
    [id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La relacion de producto-factura no fue encontrada.');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE invoice_product
    SET quantity = $1, product_id = $2
    WHERE id = $3 RETURNING *
  `,
    [payload.quantity, payload.product_id, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La relacion de producto-factura no fue encontrada.');
  }
  return response.rows[0];
};

const invoiceProductsRepository = { getAll, addOne, deleteOneById, updateOneById };

export default invoiceProductsRepository;

/////////////
// Importamos la conexion a la base de datos
// import db from '../../db/index.js';
// Importamos una clase de error personalizada para manejar errores de forma mas especifica
// import { ErrorWithStatus } from '../../utils/errorTypes.js';

// /**
//  * Obtiene todas las relaciones de productos de facturas.
//  * @returns {Promise<Array>} Un array con todas las relaciones de invoice_product.
//  */
//  const getAll = async () => {
//    const response = await db.query(
//      `
//      SELECT * FROM invoice_product
//      `
//    );
//    return response.rows;
//  };

// /**
// * Agrega un nuevo registro a la tabla intermedia invoice_product.
// * @param {Object} payload Los datos de la relacion a crear.
// * @param {number} payload.product_id El ID del producto.
// * @param {number} payload.invoice_id El ID de la factura.
// * @param {number} payload.quantity La cantidad de ese producto en la factura.
// * @returns {Promise<Object>} El objeto de la relacion creada.
// */
// const addOne = async (payload) => {
//    const response = await db.query(
//      `
//      INSERT INTO invoice_product (product_id, invoice_id, quantity)
//      VALUES ($1, $2, $3) RETURNING *
//    `,
//      [payload.product_id, payload.invoice_id, payload.quantity]
//    );
//    return response.rows[0];
//  };

// /**
// * Elimina una relacion de producto de factura por su ID.
// * @param {number} id El ID de la relacion en la tabla invoice_product.
// * @returns {Promise<Object>} El objeto de la relacion eliminada.
// * @throws {ErrorWithStatus} Si la relacion no se encuentra.
// */
// const deleteOneById = async (id) => {
//    const response = await db.query(
//      `
//      DELETE FROM invoice_product
//      WHERE id = $1 RETURNING *
//    `,
//      [id]
//    );
//    if (response.rowCount === 0) {
//      throw new ErrorWithStatus(404, 'La relacion de producto-factura no fue encontrada.');
//    }
//    return response.rows[0];
//  };

// /**
// * Actualiza la cantidad de un producto en una factura.
// * @param {number} id El ID de la relacion en la tabla invoice_product.
// * @param {Object} payload Los datos a actualizar.
// * @param {number} payload.quantity La nueva cantidad del producto.
// * @returns {Promise<Object>} El objeto de la relacion actualizado.
// * @throws {ErrorWithStatus} Si la relacion no se encuentra.
// */
// const updateOneById = async (id, payload) => {
//    const response = await db.query(
//      `
//      UPDATE invoice_product
//      SET quantity = $1
//      WHERE id = $2 RETURNING *
//    `,
//      [payload.quantity, id]
//    );
//    if (response.rowCount === 0) {
//      throw new ErrorWithStatus(404, 'La relacion de producto-factura no fue encontrada.');
//    }
//    return response.rows[0];
//  };

// const invoiceProductsRepository = { getAll, addOne, deleteOneById, updateOneById };

// export default invoiceProductsRepository;
