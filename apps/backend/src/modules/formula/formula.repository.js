import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query(
    `
    SELECT * FROM formula 
    `,
  );
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO formula (product_id, supply_id, quantity)
    VALUES ($1, $2, $3) RETURNING *
  `,
    [payload.product_id, payload.supply_id, payload.quantity],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM formula
    WHERE id = $1 RETURNING *
  `,
    [payload.formulaId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La formula no fue encontrada.');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE formula
    SET product_id = $1, supply_id = $2, 
    quantity = $3
    WHERE id = $4 RETURNING *
  `,
    [payload.product_id, payload.supply_id, payload.quantity, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La formula no fue encontrada.');
  }
  return response.rows[0];
};

const formulaRepository = { getAll, addOne, deleteOneById, updateOneById };

export default formulaRepository;

/////////////
// Importamos la conexion a la base de datos
// import db from '../../db/index.js';
// Importamos una clase de error personalizada para manejar errores de forma mas especifica
// import { ErrorWithStatus } from '../../utils/errorTypes.js';

//const productsRepository = { getAll, addOne, deleteOneById, updateOneById };

//export default productsRepository;
