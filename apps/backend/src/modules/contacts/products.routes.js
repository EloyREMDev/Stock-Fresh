import express from 'express';
import productsRepository from './products.repository.js';
import {
  createProductRouteSchema,
  deleteProductRouteSchema,
  updateProductRouteSchema,
} from './products.routes.schemas.js';
const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const products = await productsRepository.getAll();
  res.json(products);
});

productsRouter.post('/', async (req, res) => {
  const body = createProductRouteSchema.body.parse(req.body);
  const newProduct = await productsRepository.addOne(body);
  res.json(newProduct);
});

productsRouter.delete('/:id', async (req, res) => {
  const params = deleteProductRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const productDeleted = await productsRepository.deleteOneById({
    productId: params.id,
  });
  console.log('PRODUCTO ELIMINADO', productDeleted);

  res.json(productDeleted);
});

productsRouter.put('/:id', async (req, res) => {
  const body = updateProductRouteSchema.body.parse(req.body);
  const params = updateProductRouteSchema.params.parse(req.params);
  const productUpdated = await productsRepository.updateOneById(params.id, body);
  res.json(productUpdated);
});

export default productsRouter;

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
