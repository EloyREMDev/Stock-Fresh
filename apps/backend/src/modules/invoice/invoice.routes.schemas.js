import { z } from 'zod';
import { createInvoiceSchema, updateInvoiceSchema } from './invoice.schemas.js';

// Zod schema for invoice ID, used in params for update and delete routes
const invoiceIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El ID de la factura debe ser un numero.');

// Esquema para la ruta de creación de facturas.
export const createInvoiceRouteSchema = {
  params: z.object({}),
  // El cuerpo de la petición ahora usa el esquema de creación importado.
  body: createInvoiceSchema,
  queries: z.object({}),
};

// Esquema para la ruta de actualización de facturas.
export const updateInvoiceRouteSchema = {
  params: z.object({
    id: invoiceIdSchema,
  }),
  // El cuerpo de la petición ahora usa el esquema de actualización importado.
  body: updateInvoiceSchema,
  queries: z.object({}),
};

// Esquema para la ruta de eliminación de facturas.
export const deleteInvoiceRouteSchema = {
  params: z.object({
    id: invoiceIdSchema,
  }),
  body: z.object({}),
  queries: z.object({}),
};
//

// cambiosgem
//import { z } from 'zod/v4';
//import { invoiceSchema } from './invoice.schema.js';

// Esquema para validar un solo producto en el carrito.
//const invoiceProductIdSchema = z
//  .string()
//  .transform((val) => Number(val))
//  .refine((val) => !isNaN(val) && val > 0, 'El id del producto debe ser un numero positivo.');

// Esquema para crear un nuevo carrito.
//export const createInvoiceRouteSchema = {
//  params: z.object({}),
//  body: invoiceSchema,
//  queries: z.object({}),
//};

// Esquema para eliminar un producto del carrito.
//export const deleteInvoiceRouteSchema = {
//  params: z.object({ id: invoiceProductIdSchema }),
//  body: z.object({}),
//  queries: z.object({}),
//};

// Esquema para actualizar un producto en el carrito (ej. cambiar la cantidad).
//export const updateInvoiceRouteSchema = {
//  params: z.object({ id: invoiceProductIdSchema }),
// El body solo necesita la cantidad para actualizar el producto en el carrito.
//  body: z.object({
//    quantity: z.number().int().positive('La cantidad debe ser un numero entero positivo.'),
//  }),
//  queries: z.object({}),
//};
