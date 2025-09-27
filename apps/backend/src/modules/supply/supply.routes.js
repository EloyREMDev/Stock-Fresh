import express from 'express';
import supplyRepository from './supply.repository.js';
import {
  createSupplyRouteSchema,
  deleteSupplyRouteSchema,
  updateSupplyRouteSchema,
} from './supply.routes.schemas.js';
const supplyRouter = express.Router();

supplyRouter.get('/', async (req, res) => {
  const supply = await supplyRepository.getAll();
  res.json(supply);
});

supplyRouter.post('/', async (req, res) => {
  const body = createSupplyRouteSchema.body.parse(req.body);
  const newSupply = await supplyRepository.addOne(body);
  res.json(newSupply);
});

supplyRouter.delete('/:id', async (req, res) => {
  const params = deleteSupplyRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const supplyDeleted = await supplyRepository.deleteOneById({
    supplyId: params.id,
  });
  console.log('INSUMO ELIMINADO', supplyDeleted);

  res.json(supplyDeleted);
});

supplyRouter.put('/:id', async (req, res) => {
  const body = updateSupplyRouteSchema.body.parse(req.body);
  const params = updateSupplyRouteSchema.params.parse(req.params);
  const supplyUpdated = await supplyRepository.updateOneById(params.id, body);
  res.json(supplyUpdated);
});

export default supplyRouter;

///////////
// import express from 'express';
// import productsRepository from './products.repository.js';
// import {
//   createProductRouteSchema,
//   deleteProductRouteSchema,
//   updateProductRouteSchema,
// } from './products.routes.schemas.js';

// const productsRouter = express.Router();

// // Ruta para obtener todos los productos
// productsRouter.get('/', async (req, res) => {
//   // Ya no se requiere el 'userId' porque getAll() ahora trae todos los productos
//   const products = await productsRepository.getAll();
//   res.json(products);
// });

// // Ruta para crear un nuevo producto
// productsRouter.post('/', async (req, res) => {
//   // Se valida el cuerpo de la peticion con el esquema de Zod
//   const body = createProductRouteSchema.body.parse(req.body);
//   // Se crea un nuevo producto sin asociarlo a un usuario
//   const newProduct = await productsRepository.addOne(body);
//   res.json(newProduct);
// });

// // Ruta para eliminar un producto por su ID
// productsRouter.delete('/:id', async (req, res) => {
//   // Se valida el parametro 'id'
//   const params = deleteProductRouteSchema.params.parse(req.params);
//   const productDeleted = await productsRepository.deleteOneById({
//     productId: params.id,
//   });

//   res.json(productDeleted);
// });

// // Ruta para actualizar un producto por su ID
// productsRouter.put('/:id', async (req, res) => {
//   // Se validan los parametros y el cuerpo de la peticion
//   const body = updateProductRouteSchema.body.parse(req.body);
//   const params = updateProductRouteSchema.params.parse(req.params);
//   // Se actualiza el producto sin usar el 'userId'
//   const productUpdated = await productsRepository.updateOneById(params.id, body);
//   res.json(productUpdated);
// });

// export default productsRouter;
