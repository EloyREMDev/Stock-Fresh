import express from 'express';
import productsRouter from './src/modules/contacts/products.routes.js';
import { ZodError } from 'zod/v4';
import { ErrorWithStatus } from './src/utils/errorTypes.js';
import { DatabaseError } from 'pg';
import cors from 'cors';
import usersRouter from './src/modules/users/users.routes.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { authenticateUser } from './src/modules/auth/auth.middlewares.js';
import authRouter from './src/modules/auth/auth.routes.js';
import invoiceRouter from './src/modules/invoice/invoice.routes.js';
import invoiceProductsRouter from './src/modules/invoiceproduct/invoiceProducts.routes.js';
import dolarRouter from './src/routes/dolar.js';
import productsImagesRouter from './src/modules/contacts/products.images.routes.js';
import supplyRouter from './src/modules/supply/supply.routes.js';
import formulaRouter from './src/modules/formula/formula.routes.js';
import path from 'path';
import { handler as ssrHandler } from './dist/server/entry.mjs';
const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:4321'] }));
app.use(express.json());
app.use(cookieParser());

// authenticateUser va de middleware cuando necesite validacion "app.use('/api/products',authenticateUser, productsRouter);"
app.use('/api/products/images', productsImagesRouter);
app.use('/api/products', authenticateUser, productsRouter);
app.use('/api/supply', supplyRouter);
app.use('/api/formula', formulaRouter);
app.use('/api/invoice', invoiceRouter);
app.use('/api/invoiceProducts', invoiceProductsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/dolar', dolarRouter);

app.use((err, req, res, _next) => {
  console.log(err);

  if (err instanceof ZodError) {
    const messages = err.issues.map((zodError) => zodError.message);
    const message = messages.join(',\n');
    return res.status(400).json({ error: message });
  }

  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof DatabaseError) {
    if (err.code === '22P02') {
      return res.status(400).json({ error: 'Hubo un error. Contacte al administrador' });
    }
    if (err.code === '23505') {
      return res
        .status(400)
        .json({ error: 'El correo ya esta en uso. Por favor intente con otro.' });
    }
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(403).json({ error: 'El token ha expirado' });
  }

  res.status(500).json({ erorr: 'HUBO UN ERROR' });
});

app.use(express.static(path.join(import.meta.dirname, 'dist', 'client')));
app.use(ssrHandler);

export default app;
