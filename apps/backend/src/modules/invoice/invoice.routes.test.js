import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const mocks = vi.hoisted(() => {
  return {
    invoiceRepository: {
      getAll: vi.fn(),
      addOne: vi.fn(),
      deleteOneById: vi.fn(),
      updateOneById: vi.fn(),
    },
  };
});

vi.mock('./invoice.repository.js', () => ({ default: mocks.invoiceRepository }));

const invoices = [
  {
    id: 1,
    client_name: 'Juan Perez',
    client_phone_number: '04121234567',
    status: 'pendiente',
    date: new Date(),
  },
];

describe('Cuando se intenta obtener las facturas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver las facturas cuando todo esta correcto', async () => {
    mocks.invoiceRepository.getAll.mockResolvedValue(invoices);
    const response = await request(app).get('/invoice');
    expect(mocks.invoiceRepository.getAll).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).length(1);
  });
});

describe('Cuando se intenta agregar una factura', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver la factura agregada cuando la validacion es correcta', async () => {
    const newInvoiceStructure = {
      client_name: 'Maria Garcia',
      client_phone_number: '04129876543',
      status: 'confirmado',
    };
    const expectedInvoiceStructure = { ...newInvoiceStructure, id: 678, date: new Date() };
    mocks.invoiceRepository.addOne.mockResolvedValue(expectedInvoiceStructure);
    const response = await request(app).post('/invoice').send(newInvoiceStructure);
    expect(mocks.invoiceRepository.addOne).toHaveBeenCalledTimes(1);
    expect(mocks.invoiceRepository.addOne).toBeCalledWith(newInvoiceStructure);
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual(expectedInvoiceStructure);
  });
  it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
    const newInvoiceStructure = {
      client_name: '',
      client_phone_number: '123',
      status: 'estado_invalido',
    };
    const response = await request(app).post('/invoice').send(newInvoiceStructure);
    expect(response.statusCode).toBe(400);
    // Nota: El mensaje de error puede variar según la implementación de Zod en tu router.
    // Aquí se espera un objeto con un mensaje genérico.
    expect(response.body).toHaveProperty('error');
  });
});

describe('Cuando se intenta eliminar una factura', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver la factura eliminada cuando todo es correcto', async () => {
    const expectedInvoiceStructure = invoices[0];
    mocks.invoiceRepository.deleteOneById.mockResolvedValue(expectedInvoiceStructure);
    const response = await request(app).delete('/invoice/1');
    expect(mocks.invoiceRepository.deleteOneById).toHaveBeenCalledTimes(1);
    expect(mocks.invoiceRepository.deleteOneById).toBeCalledWith(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedInvoiceStructure);
  });
  it('debe devolver un error cuando el id no es un numero', async () => {
    const response = await request(app).delete('/invoice/ifhsifj');
    expect(response.statusCode).toBe(400);
    // Mensaje de error de Zod
    expect(response.body).toHaveProperty('error');
  });
  it('debe devolver un error si la factura no fue encontrada', async () => {
    mocks.invoiceRepository.deleteOneById.mockRejectedValue(
      new ErrorWithStatus(404, 'La factura no fue encontrada.'),
    );
    const response = await request(app).delete('/invoice/6464');
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: 'La factura no fue encontrada.' });
  });
});

describe('Cuando se intenta actualizar una factura', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver la factura actualizada cuando todo es correcto', async () => {
    const newInvoiceStructure = {
      client_name: 'Jose Perez',
      status: 'confirmado',
    };
    const expectedInvoiceStructure = { ...invoices[0], ...newInvoiceStructure };
    mocks.invoiceRepository.updateOneById.mockResolvedValue(expectedInvoiceStructure);
    const response = await request(app).put('/invoice/1').send(newInvoiceStructure);
    expect(mocks.invoiceRepository.updateOneById).toHaveBeenCalledTimes(1);
    expect(mocks.invoiceRepository.updateOneById).toBeCalledWith(1, newInvoiceStructure);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedInvoiceStructure);
  });
  it('debe devolver un error cuando el id no es un numero', async () => {
    const newInvoiceStructure = {
      client_name: 'Jose Perez',
      status: 'confirmado',
    };
    const response = await request(app).put('/invoice/ifhsifj').send(newInvoiceStructure);
    expect(response.statusCode).toBe(400);
    // Mensaje de error de Zod
    expect(response.body).toHaveProperty('error');
  });
  it('debe devolver un error si la factura no fue encontrada', async () => {
    const newInvoiceStructure = {
      client_name: 'Jose Perez',
      status: 'confirmado',
    };
    mocks.invoiceRepository.updateOneById.mockRejectedValue(
      new ErrorWithStatus(404, 'La factura no fue encontrada.'),
    );
    const response = await request(app).put('/invoice/6464').send(newInvoiceStructure);
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: 'La factura no fue encontrada.' });
  });
  it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
    const newInvoiceStructure = { client_name: '', status: 'estado_invalido' };
    const response = await request(app).put('/invoice/1').send(newInvoiceStructure);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

//--------------

//
// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import request from 'supertest';
// import app from '../../../app.js';
// import { ErrorWithStatus } from '../../utils/errorTypes.js';

// // Mocks del repositorio para simular la base de datos
// const mocks = vi.hoisted(() => {
//   return {
//     invoiceRepository: {
//       getAll: vi.fn(),
//       addOne: vi.fn(),
//       updateOneById: vi.fn(),
//       deleteOneById: vi.fn(),
//     },
//   };
// });

// // Mock del repositorio de facturas para aislar las pruebas de la base de datos real
// vi.mock('./invoice.repository.js', () => ({ default: mocks.invoiceRepository }));

// // Datos de prueba para el carrito
// const cartItems = [
//   { productId: 123, quantity: 2 },
//   { productId: 456, quantity: 1 },
// ];

// describe('Cuando se intenta obtener los productos del carrito', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('debe devolver los productos del carrito cuando todo esta correcto', async () => {
//     mocks.invoiceRepository.getAll.mockResolvedValue(cartItems);
//     const response = await request(app).get('/invoice');
//     expect(mocks.invoiceRepository.getAll).toHaveBeenCalledTimes(1);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).length(2);
//   });
// });

// describe('Cuando se intenta agregar un producto al carrito', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('debe devolver el producto agregado cuando la validacion es correcta', async () => {
//     const newCartItem = { client_name: "Juan Perez", client_phone_number: "04122334566", products: [{ productId: 789, quantity: 3 }] };
//     const expectedResponse = { ...newCartItem, id: 12345 };
//     mocks.invoiceRepository.addOne.mockResolvedValue(expectedResponse);
//     const response = await request(app).post('/invoice').send(newCartItem);
//     expect(mocks.invoiceRepository.addOne).toHaveBeenCalledTimes(1);
//     expect(mocks.invoiceRepository.addOne).toBeCalledWith({ ...newCartItem, userId: expect.any(String) });
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toStrictEqual(expectedResponse);
//   });

//   it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
//     const newCartItem = { client_name: 'Alejandro', client_phone_number: '04122334566', products: [] };
//     const response = await request(app).post('/invoice').send(newCartItem);
//     expect(response.statusCode).toBe(400);
//     expect(response.body).toStrictEqual({ error: 'La factura debe tener al menos un producto.' });
//   });
// });

// describe('Cuando se intenta actualizar la cantidad de un producto en el carrito', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('debe devolver el producto actualizado cuando todo es correcto', async () => {
//     const updatedQuantity = { quantity: 5 };
//     const expectedResponse = { ...cartItems[0], ...updatedQuantity };
//     mocks.invoiceRepository.updateOneById.mockResolvedValue(expectedResponse);
//     const response = await request(app).put('/invoice/123').send(updatedQuantity);
//     expect(mocks.invoiceRepository.updateOneById).toHaveBeenCalledTimes(1);
//     expect(mocks.invoiceRepository.updateOneById).toBeCalledWith({ productId: 123, userId: expect.any(String), quantity: 5 });
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toStrictEqual(expectedResponse);
//   });

//   it('debe devolver un error cuando el id no es un numero', async () => {
//     const updatedQuantity = { quantity: 5 };
//     const response = await request(app).put('/invoice/ifhsifj').send(updatedQuantity);
//     expect(response.statusCode).toBe(400);
//     expect(response.body).toStrictEqual({ error: 'El id del producto debe ser un numero positivo.' });
//   });

//   it('debe devolver un error si la cantidad es invalida', async () => {
//     const updatedQuantity = { quantity: 0 };
//     const response = await request(app).put('/invoice/123').send(updatedQuantity);
//     expect(response.statusCode).toBe(400);
//     expect(response.body).toStrictEqual({ error: 'La cantidad debe ser un numero entero positivo.' });
//   });
// });

// describe('Cuando se intenta eliminar un producto del carrito', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('debe devolver el producto eliminado cuando todo es correcto', async () => {
//     const expectedResponse = cartItems[0];
//     mocks.invoiceRepository.deleteOneById.mockResolvedValue(expectedResponse);
//     const response = await request(app).delete('/invoice/123');
//     expect(mocks.invoiceRepository.deleteOneById).toHaveBeenCalledTimes(1);
//     expect(mocks.invoiceRepository.deleteOneById).toBeCalledWith({ productId: 123, userId: expect.any(String) });
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toStrictEqual(expectedResponse);
//   });

//   it('debe devolver un error cuando el id no es un numero', async () => {
//     const response = await request(app).delete('/invoice/ifhsifj');
//     expect(response.statusCode).toBe(400);
//     expect(response.body).toStrictEqual({ error: 'El id del producto debe ser un numero positivo.' });
//   });

//   it('debe devolver un error si el producto no fue encontrado', async () => {
//     mocks.invoiceRepository.deleteOneById.mockRejectedValue(
//       new ErrorWithStatus(404, 'Producto no encontrado en el carrito.'),
//     );
//     const response = await request(app).delete('/invoice/6464');
//     expect(response.statusCode).toBe(404);
//     expect(response.body).toStrictEqual({ error: 'Producto no encontrado en el carrito.' });
//   });
// });
