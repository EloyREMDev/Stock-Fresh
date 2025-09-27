import { z } from 'zod/v4';
import { invoiceProductSchema } from './invoiceProducts.schemas.js';

const invoiceProductIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id de la factura del producto debe ser un numero.');

export const createInvoiceProductRouteSchema = {
  params: z.object({}),
  body: invoiceProductSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deleteInvoiceProductRouteSchema = {
  params: z.object({ id: invoiceProductIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};
//
export const updateInvoiceProductRouteSchema = {
  params: z.object({ id: invoiceProductIdSchema }),
  body: invoiceProductSchema.omit({ id: true }),
  queries: z.object({}),
};

// cambiosgem
// import { z } from 'zod/v4';
// import { invoiceProductSchema } from './invoiceProducts.schemas.js';

// Define un esquema de validación para el ID del producto de factura en la URL.
// Convierte el ID de un string (como viene en la URL) a un número.
// const invoiceProductIdSchema = z
//   .string()
//   .transform((val) => Number(val))
//   .refine((val) => !isNaN(val), 'El id del producto de factura debe ser un numero.');

// Esquema para la ruta de creación de un producto en una factura (POST).
// No se esperan parámetros en la URL ni queries, solo el cuerpo de la petición.
// export const createInvoiceProductRouteSchema = {
//   params: z.object({}),
//   body: invoiceProductSchema.omit({ id: true }),
//   queries: z.object({}),
// };

// Esquema para la ruta de eliminación de un producto en una factura (DELETE).
// Se espera el ID del registro en los parámetros de la URL.
// export const deleteInvoiceProductRouteSchema = {
//   params: z.object({ id: invoiceProductIdSchema }),
//   body: z.object({}),
//   queries: z.object({}),
// };

// Esquema para la ruta de actualización de un producto en una factura (PUT o PATCH).
// Se espera el ID del registro en los parámetros de la URL y los datos a actualizar en el cuerpo.
// export const updateInvoiceProductRouteSchema = {
//   params: z.object({ id: invoiceProductIdSchema }),
//   body: invoiceProductSchema.omit({ id: true }),
//   queries: z.object({}),
// };
