import { z } from 'zod/v4';
import { productSchema } from './products.schemas.js';

const productIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id del producto debe ser un numero.');

export const createProductRouteSchema = {
  params: z.object({}),
  body: productSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deleteProductRouteSchema = {
  params: z.object({ id: productIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};
//
export const updateProductRouteSchema = {
  params: z.object({ id: productIdSchema }),
  body: productSchema.omit({ id: true }),
  queries: z.object({}),
};

// cambiosgem
// import { z } from 'zod/v4';
// import { productSchema } from './products.schemas.js';

// // Schema para validar el ID del producto en los parámetros de la ruta.
// const productIdSchema = z
//  .string()
// .transform((val) => Number(val))
//  .refine((val) => !isNaN(val), 'El id del producto debe ser un numero.');

// Esquema de validacion para la creacion de un nuevo producto.
// Se omite el 'id' porque la base de datos lo generara automaticamente.
// export const createProductRouteSchema = {
//   params: z.object({}),
//   body: productSchema.omit({ id: true }),
//  queries: z.object({}),
// };

// // Esquema de validacion para eliminar un producto.
// // Solo se requiere el 'id' en los parametros.
// export const deleteProductRouteSchema = {
//   params: z.object({ id: productIdSchema }),
//   body: z.object({}),
//   queries: z.object({}),
// };

// // Esquema de validacion para actualizar un producto.
// // Se requiere el 'id' en los parametros y los datos a actualizar en el cuerpo,
// // omitiendo tambien el 'id' en el body.
// export const updateProductRouteSchema = {
//  params: z.object({ id: productIdSchema }),
//   body: productSchema.omit({ id: true }),
//   queries: z.object({}),
// };
