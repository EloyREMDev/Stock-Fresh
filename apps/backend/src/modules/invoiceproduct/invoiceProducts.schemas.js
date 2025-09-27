import { z } from 'zod/v4';

// const NAME_REGEX = /^[A-Z][a-z]*[ ][A-Z][a-z]{3,}[ ]{0,1}$/;
// const PHONE_REGEX = /^[0](412|424|414|426|416|212)[0-9]{7}$/;

// Esta tabla solo almacena la relación entre una factura y un producto, junto con la cantidad del producto en esa factura.
export const invoiceProductSchema = z.object({
  id: z.number(),
  product_id: z.number().int().positive('El id del producto debe ser un numero entero positivo.'),
  invoice_id: z.number().int().positive('El id de la factura debe ser un numero entero positivo.'),
  quantity: z.number().int().positive('La cantidad debe ser un numero entero positivo.'),
});

// Esta tabla solo almacena la relación entre una factura y un producto, junto con la cantidad del producto en esa factura.
// export const invoiceProductSchema = z.object({
//   id: z.number().int().positive().optional(), // ID de la fila en la tabla, es opcional porque se genera automaticamente
//   product_id: z.number().int().positive('El id del producto debe ser un numero entero positivo.'),
//   invoice_id: z.number().int().positive('El id de la factura debe ser un numero entero positivo.'),
// });

// const validInvoiceProduct = {
//   {
//   "product_id": 1,
//   "invoice_id": 1
// }
