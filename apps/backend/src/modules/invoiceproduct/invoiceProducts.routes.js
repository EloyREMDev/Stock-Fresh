import express from 'express';
import invoiceProductsRepository from './invoiceProducts.repository.js';
import {
  createInvoiceProductRouteSchema,
  deleteInvoiceProductRouteSchema,
  updateInvoiceProductRouteSchema,
} from './invoiceProducts.routes.schemas.js';
const invoiceProductsRouter = express.Router();

invoiceProductsRouter.get('/', async (req, res) => {
  try {
    const invoiceProducts = await invoiceProductsRepository.getAll();
    res.json(invoiceProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener todos los productos de las facturas.', error });
  }
});

invoiceProductsRouter.post('/', async (req, res) => {
  try {
    const body = createInvoiceProductRouteSchema.body.parse(req.body);
    const newInvoiceProduct = await invoiceProductsRepository.addOne(body);
    res.status(201).json(newInvoiceProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Datos de entrada inválidos para crear un producto de factura.', error });
  }
});

invoiceProductsRouter.delete('/:id', async (req, res) => {
  try {
    const params = deleteInvoiceProductRouteSchema.params.parse(req.params);
    const invoiceProductDeleted = await invoiceProductsRepository.deleteOneById(params.id);
    res.status(200).json(invoiceProductDeleted);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al eliminar el producto de la factura.', error });
    }
  }
});

invoiceProductsRouter.put('/:id', async (req, res) => {
  try {
    const body = updateInvoiceProductRouteSchema.body.parse(req.body);
    const params = updateInvoiceProductRouteSchema.params.parse(req.params);
    const invoiceProductUpdated = await invoiceProductsRepository.updateOneById(params.id, body);
    res.status(200).json(invoiceProductUpdated);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({
        message: 'Datos de entrada inválidos para actualizar un producto de factura.',
        error,
      });
    }
  }
});

export default invoiceProductsRouter;

///////////
// import express from 'express';
// import invoiceProductsRepository from './invoiceProducts.repository.js';
// import {
//   createInvoiceProductRouteSchema,
//   deleteInvoiceProductRouteSchema,
//   updateInvoiceProductRouteSchema,
// } from './invoiceProducts.routes.schemas.js';

// const invoiceProductsRouter = express.Router();

// invoiceProductsRouter.get('/', async (req, res) => {
//   try {
//     const invoiceProducts = await invoiceProductsRepository.getAll();
//     res.json(invoiceProducts);
//   } catch (error) {
//     res.status(500).json({ message: 'Error al obtener todos los productos de las facturas.', error });
//   }
// });

// invoiceProductsRouter.post('/', async (req, res) => {
//   try {
//     const body = createInvoiceProductRouteSchema.body.parse(req.body);
//     const newInvoiceProduct = await invoiceProductsRepository.addOne(body);
//     res.status(201).json(newInvoiceProduct);
//   } catch (error) {
//     res.status(400).json({ message: 'Datos de entrada inválidos para crear un producto de factura.', error });
//   }
// });

// invoiceProductsRouter.delete('/:id', async (req, res) => {
//   try {
//     const params = deleteInvoiceProductRouteSchema.params.parse(req.params);
//     const invoiceProductDeleted = await invoiceProductsRepository.deleteOneById(params.id);
//     res.status(200).json(invoiceProductDeleted);
//   } catch (error) {
//     if (error.status === 404) {
//       res.status(404).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'Error al eliminar el producto de la factura.', error });
//     }
//   }
// });

// invoiceProductsRouter.put('/:id', async (req, res) => {
//   try {
//     const body = updateInvoiceProductRouteSchema.body.parse(req.body);
//     const params = updateInvoiceProductRouteSchema.params.parse(req.params);
//     const invoiceProductUpdated = await invoiceProductsRepository.updateOneById(params.id, body);
//     res.status(200).json(invoiceProductUpdated);
//   } catch (error) {
//     if (error.status === 404) {
//       res.status(404).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: 'Datos de entrada inválidos para actualizar un producto de factura.', error });
//     }
//   }
// });

// export default invoiceProductsRouter;
