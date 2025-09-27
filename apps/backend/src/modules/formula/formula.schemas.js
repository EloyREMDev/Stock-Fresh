import { z } from 'zod/v4';

// const NAME_REGEX = /^[A-Z][a-z]*[ ][A-Z][a-z]{3,}[ ]{0,1}$/;
// const PHONE_REGEX = /^[0](412|424|414|426|416|212)[0-9]{7}$/;

// productSchema
export const formulaSchema = z.object({
  id: z.number(),
  product_id: z.number().int().positive('El id del producto debe ser un numero entero positivo.'),
  supply_id: z.number().int().positive('El id del insumo debe ser un numero entero positivo.'),
  quantity: z.number().int().positive('La cantidad debe ser un numero entero positivo.'),
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
