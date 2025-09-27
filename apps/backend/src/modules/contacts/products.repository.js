import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query(
    `
    SELECT * FROM product 
    `,
  );
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO product (name, description, price, price_bs, quantity, minimum_stock, image, manufacturer)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `,
    [
      payload.name,
      payload.description,
      payload.price,
      payload.price_bs,
      payload.quantity,
      payload.minimum_stock,
      payload.image,
      payload.manufacturer,
    ],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM product
    WHERE id = $1 RETURNING *
  `,
    [payload.productId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El producto no fue encontrado.');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE product
    SET name = $1, description = $2, 
    price = $3, price_bs = $4, quantity = $5, minimum_stock = $6, image = $7, manufacturer = $8
    WHERE id = $9 RETURNING *
  `,
    [
      payload.name,
      payload.description,
      payload.price,
      payload.price_bs,
      payload.quantity,
      payload.minimum_stock,
      payload.image,
      payload.manufacturer,
      id,
    ],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El producto no fue encontrado.');
  }
  return response.rows[0];
};

const productsRepository = { getAll, addOne, deleteOneById, updateOneById };

export default productsRepository;

/////////////
// Importamos la conexion a la base de datos
// import db from '../../db/index.js';
// Importamos una clase de error personalizada para manejar errores de forma mas especifica
// import { ErrorWithStatus } from '../../utils/errorTypes.js';

//const productsRepository = { getAll, addOne, deleteOneById, updateOneById };

//export default productsRepository;
