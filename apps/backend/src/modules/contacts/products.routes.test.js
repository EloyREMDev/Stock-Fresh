import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const mocks = vi.hoisted(() => {
  return {
    productsRepository: {
      getAll: vi.fn(),
      addOne: vi.fn(),
      deleteOneById: vi.fn(),
      updateOneById: vi.fn(),
    },
  };
});

vi.mock('./products.repository.js', () => ({ default: mocks.productsRepository }));

const products = [
  {
    id: 1,
    name: 'Laptop',
    quantity: 10,
    image: 'https://example.com/laptop.jpg',
    manufacturer: 'TechCorp',
    price: 1200,
  },
];

describe('Cuando se intenta obtener los productos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver los productos cuando todo esta correcto', async () => {
    mocks.productsRepository.getAll.mockResolvedValue(products);
    const response = await request(app).get('/products');
    expect(mocks.productsRepository.getAll).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).length(1);
  });
});

describe('Cuando se intenta agregar un producto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver el producto agregado cuando la validacio es correcta', async () => {
    const newProductStructure = {
      name: 'Mouse',
      quantity: 50,
      image: 'https://example.com/mouse.jpg',
      manufacturer: 'LogiTech',
      price: 25,
    };
    const expectedProductStructure = { ...newProductStructure, id: 678 };
    mocks.productsRepository.addOne.mockResolvedValue(expectedProductStructure);
    const response = await request(app).post('/products').send(newProductStructure);
    expect(mocks.productsRepository.addOne).toHaveBeenCalledTimes(1);
    expect(mocks.productsRepository.addOne).toBeCalledWith(newProductStructure);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedProductStructure);
  });
  it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
    const newProductStructure = { name: '', quantity: 10, manufacturer: 'TechCorp', price: 1200 };
    const response = await request(app).post('/products').send(newProductStructure);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'El nombre del producto no puede estar vacio.' });
  });
});

describe('Cuando se intenta eliminar un producto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver el producto eliminado cuando todo es correcto', async () => {
    const expectedProductStructure = products[0];
    mocks.productsRepository.deleteOneById.mockResolvedValue(expectedProductStructure);
    const response = await request(app).delete('/products/123');
    expect(mocks.productsRepository.deleteOneById).toHaveBeenCalledTimes(1);
    expect(mocks.productsRepository.deleteOneById).toBeCalledWith({ productId: 123 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedProductStructure);
  });
  it('debe devolver un error cuando el id no es un numero', async () => {
    const response = await request(app).delete('/products/ifhsifj');
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'El id del producto debe ser un numero.' });
  });
  it('debe devolver un error el peoducto no fue encontrado', async () => {
    mocks.productsRepository.deleteOneById.mockRejectedValue(
      new ErrorWithStatus(404, 'El producto no fue encontrado.'),
    );
    const response = await request(app).delete('/products/6464');
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: 'El producto no fue encontrado.' });
  });
});

describe('Cuando se intenta actualizar un producto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver el producto actualizado cuando todo es correcto', async () => {
    const newProductStructure = {
      name: 'Mouse',
      quantity: 50,
      image: 'https://example.com/mouse.jpg',
      manufacturer: 'LogiTech',
      price: 25,
    };
    const expectedProductStructure = { ...products[0], ...newProductStructure };
    mocks.productsRepository.updateOneById.mockResolvedValue(expectedProductStructure);
    const response = await request(app).put('/products/123').send(newProductStructure);
    expect(mocks.productsRepository.updateOneById).toHaveBeenCalledTimes(1);
    expect(mocks.productsRepository.updateOneById).toBeCalledWith(123, newProductStructure);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedProductStructure);
  });
  it('debe devolver un error cuando el id no es un numero', async () => {
    const newProductStructure = {
      name: 'Mouse',
      quantity: 50,
      manufacturer: 'LogiTech',
      price: 25,
    };
    const response = await request(app).put('/products/ifhsifj').send(newProductStructure);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'El id del producto debe que ser un numero.' });
  });
  it('debe devolver un error si el producto no fue encontrado', async () => {
    const newProductStructure = {
      name: 'Mouse',
      quantity: 50,
      manufacturer: 'LogiTech',
      price: 25,
    };
    mocks.productsRepository.updateOneById.mockRejectedValue(
      new ErrorWithStatus(404, 'El producto no fue encontrado.'),
    );
    const response = await request(app).put('/products/6464').send(newProductStructure);
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: 'El producto no fue encontrado.' });
  });
  it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
    const newProductStructure = { name: '', quantity: 50, manufacturer: 'LogiTech', price: 25 };
    const response = await request(app).put('/products/123').send(newProductStructure);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'El nombre del producto no puede estar vacio.' });
  });
});
//--------------

//
//import { beforeEach, describe, expect, it, vi } from 'vitest';
//import request from 'supertest';
//import app from '../../../app.js';
//import { ErrorWithStatus } from '../../utils/errorTypes.js';

// const mocks = vi.hoisted(() => {
//   return {
//     productsRepository: {
//       getAll: vi.fn(),
//       addOne: vi.fn(),
//       deleteOneById: vi.fn(),
//       updateOneById: vi.fn(),
//     },
//   };
// });

// vi.mock('./products.repository.js', () => ({ default: mocks.productsRepository }));

// const products = [{
//   id: 1,
//   name: "Laptop",
//   quantity: 10,
//   image: "https://example.com/laptop.jpg",
//   manufacturer: "TechCorp",
//   price: 1200
// }];

// describe('Cuando se intenta obtener los productos', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('debe devolver los productos cuando todo esta correcto', async () => {
//     mocks.productsRepository.getAll.mockResolvedValue(products);
//     const response = await request(app).get('/products');
//     expect(mocks.productsRepository.getAll).toHaveBeenCalledTimes(1);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).length(1);
//   });
// });

// describe('Cuando se intenta agregar un producto', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('debe devolver el producto agregado cuando la validacion es correcta', async () => {
//     const newProductStructure = {
//       name: "Mouse",
//       quantity: 50,
//       image: "https://example.com/mouse.jpg",
//       manufacturer: "LogiTech",
//       price: 25
//     };
//     const expectedProductStructure = { ...newProductStructure, id: 678 };
//     mocks.productsRepository.addOne.mockResolvedValue(expectedProductStructure);
//     const response = await request(app).post('/products').send(newProductStructure);
//     expect(mocks.productsRepository.addOne).toHaveBeenCalledTimes(1);
//     expect(mocks.productsRepository.addOne).toBeCalledWith(newProductStructure);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toStrictEqual(expectedProductStructure);
//   });
//   it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
//     const newProductStructure = { name: "", quantity: 10, manufacturer: "TechCorp", price: 1200 };
//     const response = await request(app).post('/products').send(newProductStructure);
//     expect(response.statusCode).toBe(400);
//     expect(response.body).toStrictEqual({ error: 'El nombre del producto no puede estar vacio.' });
//   });
// });

// describe('Cuando se intenta eliminar un producto', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('debe devolver el producto eliminado cuando todo es correcto', async () => {
//     const expectedProductStructure = products[0];
//     mocks.productsRepository.deleteOneById.mockResolvedValue(expectedProductStructure);
//     const response = await request(app).delete('/products/1');
//     expect(mocks.productsRepository.deleteOneById).toHaveBeenCalledTimes(1);
//     expect(mocks.productsRepository.deleteOneById).toBeCalledWith({ productId: 1 });
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toStrictEqual(expectedProductStructure);
//   });
//   it('debe devolver un error cuando el id no es un numero', async () => {
//     const response = await request(app).delete('/products/ifhsifj');
//     expect(response.statusCode).toBe(400);
//     expect(response.body).toStrictEqual({ error: 'El id del producto debe ser un numero.' });
//   });
//   it('debe devolver un error si el producto no fue encontrado', async () => {
//     mocks.productsRepository.deleteOneById.mockRejectedValue(
//       new ErrorWithStatus(404, 'El producto no fue encontrado.'),
//     );
//     const response = await request(app).delete('/products/6464');
//     expect(response.statusCode).toBe(404);
//     expect(response.body).toStrictEqual({ error: 'El producto no fue encontrado.' });
//   });
// });

// describe('Cuando se intenta actualizar un producto', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('debe devolver el producto actualizado cuando todo es correcto', async () => {
//     const newProductStructure = {
//       name: "Mouse",
//       quantity: 50,
//       image: "https://example.com/mouse.jpg",
//       manufacturer: "LogiTech",
//       price: 25
//     };
//     const expectedProductStructure = { ...products[0], ...newProductStructure };
//     mocks.productsRepository.updateOneById.mockResolvedValue(expectedProductStructure);
//     const response = await request(app).put('/products/1').send(newProductStructure);
//     expect(mocks.productsRepository.updateOneById).toHaveBeenCalledTimes(1);
//     expect(mocks.productsRepository.updateOneById).toBeCalledWith(
//       1,
//       newProductStructure,
//     );
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toStrictEqual(expectedProductStructure);
//   });
//   it('debe devolver un error cuando el id no es un numero', async () => {
//     const newProductStructure = { name: "Mouse", quantity: 50, manufacturer: "LogiTech", price: 25 };
//     const response = await request(app).put('/products/ifhsifj').send(newProductStructure);
//     expect(response.statusCode).toBe(400);
//     expect(response.body).toStrictEqual({ error: 'El id del producto debe ser un numero.' });
//   });
//   it('debe devolver un error si el producto no fue encontrado', async () => {
//     const newProductStructure = { name: "Mouse", quantity: 50, manufacturer: "LogiTech", price: 25 };
//     mocks.productsRepository.updateOneById.mockRejectedValue(
//       new ErrorWithStatus(404, 'El producto no fue encontrado.'),
//     );
//     const response = await request(app).put('/products/6464').send(newProductStructure);
//     expect(response.statusCode).toBe(404);
//     expect(response.body).toStrictEqual({ error: 'El producto no fue encontrado.' });
//   });
//   it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
//     const newProductStructure = { name: "", quantity: 50, manufacturer: "LogiTech", price: 25 };
//     const response = await request(app).put('/products/1').send(newProductStructure);
//     expect(response.statusCode).toBe(400);
//     expect(response.body).toStrictEqual({ error: 'El nombre del producto no puede estar vacio.' });
//   });
// });
