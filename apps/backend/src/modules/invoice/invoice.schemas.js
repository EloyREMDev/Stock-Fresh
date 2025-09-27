import { z } from 'zod';

const PHONE_REGEX = /^[0](412|424|414|426|416|212)[0-9]{7}$/;
const STATUS_ENUM = ['confirmado', 'pendiente'];

// Esquema para crear una factura. Todos los campos son requeridos.
export const createInvoiceSchema = z.object({
  client_name: z
    .string({
      required_error: 'El nombre del cliente es obligatorio.',
    })
    .min(1, 'El nombre del cliente no puede estar vacío.'),
  client_phone_number: z
    .string({
      required_error: 'El número de teléfono es obligatorio.',
    })
    .regex(PHONE_REGEX, 'Tiene que ser un numero de teléfono válido.'),
  status: z.enum(STATUS_ENUM, {
    required_error: 'El estado de la factura es obligatorio.',
    invalid_type_error: "El estado debe ser 'confirmado' o 'pendiente'.",
  }),
});

// Esquema para actualizar una factura. Los campos son opcionales.
export const updateInvoiceSchema = z.object({
  client_name: z.string().min(1, 'El nombre del cliente no puede estar vacío.').optional(),
  client_phone_number: z
    .string()
    .regex(PHONE_REGEX, 'Tiene que ser un numero de teléfono válido.')
    .optional(),
  status: z
    .enum(STATUS_ENUM, {
      invalid_type_error: "El estado debe ser 'confirmado' o 'pendiente'.",
    })
    .optional(),
});

// import { z } from 'zod/v4';

// const PHONE_REGEX = /^[0](412|424|414|426|416|212)[0-9]{7}$/;
// const NAME_REGEX = /^[A-Z][a-z]*[ ][A-Z][a-z]{3,}[ ]{0,1}$/;

// Este esquema define la estructura de cada producto dentro de la factura.
// No tiene 'id' porque se generará en el backend al crearlo.
// export const invoiceProductSchema = z.object({
//   product_id: z.number({
//     required_error: 'El ID del producto es obligatorio.',
//     invalid_type_error: 'El ID del producto debe ser un numero.',
//   }),
//   quantity: z.number({
//     required_error: 'La cantidad es obligatoria.',
//     invalid_type_error: 'La cantidad debe ser un numero.',
//   }).int().positive('La cantidad debe ser un numero entero positivo.'),
// });

// Este esquema define la estructura de los datos de la factura principal.
// La tabla `invoice` se usará para guardar estos datos.
// export const invoiceSchema = z.object({
//   // 'client_name' es opcional y ahora usa una regex
//   client_name: z.string().regex(NAME_REGEX, 'El nombre no es valido.').optional(),
//   // 'client_phone_number' es obligatorio, por si el cliente no está registrado.
//   client_phone_number: z.string().regex(PHONE_REGEX, 'Tiene que ser un numero de telefono valido.'),
//   // 'products' es un array de objetos que usa el 'invoiceProductSchema'
//   // y debe tener al menos un producto.
//   products: z.array(invoiceProductSchema).nonempty('La factura debe tener al menos un producto.'),
// });

// // Ejemplo de un objeto de factura valido
// const validInvoice = {
//   client_name: "Juan Perez",
//   client_phone_number: "04141234567",
//   products: [
//     {
//       product_id: 1, // ID del producto 1 de la tabla 'product'
//       quantity: 2,
//     },
//     {
//       product_id: 5, // ID del producto 5 de la tabla 'product'
//       quantity: 1,
//     },
//     {
//       product_id: 12, // ID del producto 12 de la tabla 'product'
//       quantity: 5,
//     },
//   ],
// };

// // Puedes usar el esquema para parsear y validar los datos
// try {
//   const parsedInvoice = invoiceSchema.parse(validInvoice);
//   console.log("Factura valida:", parsedInvoice);
// } catch (error) {
//   console.error("Error de validacion:", error.errors);
// }
