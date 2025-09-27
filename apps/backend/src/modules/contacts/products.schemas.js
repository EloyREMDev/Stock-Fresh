import { z } from 'zod/v4';

// const NAME_REGEX = /^[A-Z][a-z]*[ ][A-Z][a-z]{3,}[ ]{0,1}$/;
// const PHONE_REGEX = /^[0](412|424|414|426|416|212)[0-9]{7}$/;

// productSchema
export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'El nombre del producto no puede estar vacio.'),
  description: z.string().min(1, 'La descripcion del producto no puede estar vacia.'),
  price: z.number().positive('El precio debe ser un numero entero positivo.'),
  price_bs: z.number().positive('El precio debe ser un numero entero positivo.').optional(),
  quantity: z.number().int().nonnegative('La cantidad debe ser un numero entero positivo.'),
  minimum_stock: z.number().int().positive('La cantidad debe ser un numero entero positivo.'),
  image: z.url('La imagen debe ser una URL valida.').optional(),
  manufacturer: z.string().min(1, 'El fabricante no puede estar vacio.'),
  // phone: z.string().regex(PHONE_REGEX, 'Tiene que ser un numero venezolano valido'),
});

// const validProduct = {
//   id: 1,
//   name: "Laptop",
//   description: "Una computadora portátil funciona con una batería recargable, contiene una pantalla led o LCD, teclado, panel táctil o touchpad, una unidad de estado sólido o disco duro",
//   price: 1200,
//   price_bs: 50,
//   quantity: 10,
//   minimum_stock: 10,
//   image: "https://example.com/laptop.jpg",
//   manufacturer: "TechCorp",
// }; ejemplo de producto valido
