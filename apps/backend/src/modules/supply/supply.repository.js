import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query(
    `
    SELECT * FROM supply 
    `,
  );
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO supply (name, quantity, minimum_stock, supplier)
    VALUES ($1, $2, $3, $4) RETURNING *
  `,
    [payload.name, payload.quantity, payload.minimum_stock, payload.supplier],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM supply
    WHERE id = $1 RETURNING *
  `,
    [payload.supplyId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El insumo no fue encontrado.');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE supply
    SET name = $1,  
    quantity = $2, minimum_stock = $3, supplier = $4
    WHERE id = $5 RETURNING *
  `,
    [payload.name, payload.quantity, payload.minimum_stock, payload.supplier, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El insumo no fue encontrado.');
  }
  return response.rows[0];
};

const supplyRepository = { getAll, addOne, deleteOneById, updateOneById };

export default supplyRepository;

/////////////
// Importamos la conexion a la base de datos
// import db from '../../db/index.js';
// Importamos una clase de error personalizada para manejar errores de forma mas especifica
// import { ErrorWithStatus } from '../../utils/errorTypes.js';

//const productsRepository = { getAll, addOne, deleteOneById, updateOneById };

//export default productsRepository;
