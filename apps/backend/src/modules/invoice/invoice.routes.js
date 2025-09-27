import express from 'express';
import invoiceRepository from './invoice.repository.js';
import {
  createInvoiceRouteSchema,
  deleteInvoiceRouteSchema,
  updateInvoiceRouteSchema,
} from './invoice.routes.schemas.js';

const invoiceRouter = express.Router();

invoiceRouter.get('/', async (req, res) => {
  try {
    const invoices = await invoiceRepository.getAll();
    res.json(invoices);
  } catch (error) {
    // Usar el mensaje del error capturado
    res.status(500).json({ error: error.message || 'Error al obtener las facturas.' });
  }
});

invoiceRouter.post('/', async (req, res) => {
  try {
    const body = createInvoiceRouteSchema.body.parse(req.body);
    const newInvoice = await invoiceRepository.addOne(body);
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ error: error.issues || 'Error al crear la factura.' });
  }
});

invoiceRouter.put('/:id', async (req, res) => {
  try {
    const params = updateInvoiceRouteSchema.params.parse(req.params);
    const body = updateInvoiceRouteSchema.body.parse(req.body);

    const updatedInvoice = await invoiceRepository.updateOneById(params.id, body);
    res.json(updatedInvoice);
  } catch (error) {
    const status = error.statusCode || 400;
    const message = error.issues
      ? `Error de validación: ${error.issues.map((issue) => issue.message).join(', ')}`
      : error.message;
    res.status(status).json({ error: message || 'Error al actualizar la factura.' });
  }
});

invoiceRouter.delete('/:id', async (req, res) => {
  try {
    const params = deleteInvoiceRouteSchema.params.parse(req.params);
    const deletedInvoice = await invoiceRepository.deleteOneById(params.id);
    res.json(deletedInvoice);
  } catch (error) {
    const status = error.statusCode || 400;
    const message = error.issues || 'Error al eliminar la factura.';
    res.status(status).json({ error: message });
  }
});

export default invoiceRouter;

///////////
// import express from 'express';
// import invoiceRepository from './invoice.repository.js';
// import {
//   createInvoiceRouteSchema,
//   deleteInvoiceRouteSchema,
//   updateInvoiceRouteSchema,
// } from './invoice.routes.schemas.js';
// import { ErrorWithStatus } from '../../utils/errorTypes.js';

// const invoiceRouter = express.Router();

// invoiceRouter.get('/', async (req, res) => {
//   try {
//     const invoices = await invoiceRepository.getAll();
//     res.json(invoices);
//   } catch (error) {
//     res.status(500).json({ error: error.message || 'Error al obtener las facturas.' });
//   }
// });

// invoiceRouter.post('/', async (req, res) => {
//   try {
//     const body = createInvoiceRouteSchema.body.parse(req.body);
//     const newInvoice = await invoiceRepository.addOne(body);
//     res.status(201).json(newInvoice);
//   } catch (error) {
//     if (error.issues) {
//       const errorMessage = error.issues.map(issue => issue.message).join(', ');
//       return res.status(400).json({ error: `Error de validación: ${errorMessage}` });
//     }
//     res.status(500).json({ error: error.message || 'Error al crear la factura.' });
//   }
// });

// invoiceRouter.put('/:id', async (req, res) => {
//   try {
//     const params = updateInvoiceRouteSchema.params.parse(req.params);
//     const body = updateInvoiceRouteSchema.body.parse(req.body);

//     const updatedInvoice = await invoiceRepository.updateOneById(params.id, body);
//     res.json(updatedInvoice);
//   } catch (error) {
//     // Si el error tiene un `statusCode` (como un 404 de tu repositorio), lo usa
//     const status = error.statusCode || 400;
//     // Si es un error de Zod, usa los mensajes de las `issues`
//     const message = error.issues ? error.issues.map(issue => issue.message).join(', ') : error.message;

//     res.status(status).json({ error: message || 'Error al actualizar la factura.' });
//   }
// });

// invoiceRouter.delete('/:id', async (req, res) => {
//   try {
//     const params = deleteInvoiceRouteSchema.params.parse(req.params);
//     const deletedInvoice = await invoiceRepository.deleteOneById(params.id);
//     res.json(deletedInvoice);
//   } catch (error) {
//     // Si el error tiene un `statusCode` (como un 404 de tu repositorio), lo usa
//     const status = error.statusCode || 400;
//     const message = error.message;
//     res.status(status).json({ error: message || 'Error al eliminar la factura.' });
//   }
// });

// export default invoiceRouter;
