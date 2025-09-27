import db from './index.js';

const createUsersTable = async () => {
  await db.query(`
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    passwordHash TEXT NOT NULL,
    verify_email BOOLEAN DEFAULT false
    )
  `);
  console.log('Tabla de usuarios creada');
};

const createProductTable = async () => {
  await db.query(`
    CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    price_bs DECIMAL(10, 2),
    quantity INTEGER NOT NULL,
    minimum_stock INTEGER NOT NULL,
    image TEXT,
    manufacturer TEXT NOT NULL
    )
  `);
  console.log('Tabla de productos creada');
};

const createSupplyTable = async () => {
  await db.query(`
    CREATE TABLE supply (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    minimum_stock INTEGER NOT NULL,
    supplier TEXT NOT NULL
    )
  `);
  console.log('Tabla de insumos creada');
};

const createFormulaTable = async () => {
  await db.query(`
    CREATE TABLE formula (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
    supply_id INTEGER REFERENCES supply(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL
    )
  `);
  console.log('Tabla de formulas creada');
};

const createInvoiceStatusType = async () => {
  await db.query(`
     CREATE TYPE invoice_status_type AS enum ('confirmado', 'pendiente');
  `);
  console.log('Tipo de dato invoice_status_type creado');
};

const createInvoiceTable = async () => {
  await db.query(`
    CREATE TABLE invoice (
    id SERIAL PRIMARY KEY,
    date TIMESTAMPTZ DEFAULT NOW(),
    client_phone_number TEXT NOT NULL,
    client_name TEXT NOT NULL,
    status invoice_status_type NOT NULL
    )
  `);
  console.log('Tabla de facturas creada');
};

const createInvoiceProductTable = async () => {
  await db.query(`
    CREATE TABLE invoice_product (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(id) ON DELETE SET NULL,
    invoice_id INTEGER NOT NULL REFERENCES invoice(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL
    )
  `);
  console.log('Tabla de productos de facturacion creada');
};

const deleteAllTables = async () => {
  await db.query('DROP TABLE IF EXISTS invoice_product CASCADE');
  await db.query('DROP TABLE IF EXISTS invoice CASCADE');
  await db.query('DROP TABLE IF EXISTS formula CASCADE');
  await db.query('DROP TABLE IF EXISTS supply CASCADE');
  await db.query('DROP TABLE IF EXISTS product CASCADE');
  await db.query('DROP TABLE IF EXISTS users CASCADE');
  await db.query('DROP TYPE IF EXISTS invoice_status_type');
  console.log('Todas las tablas y tipos eliminados');
};

const createTables = async () => {
  await deleteAllTables();
  await createUsersTable();
  await createProductTable();
  await createSupplyTable();
  await createFormulaTable();
  await createInvoiceStatusType();
  await createInvoiceTable();
  await createInvoiceProductTable();
  console.log('Tablas creadas correctamente');

  await db.query(`
  CREATE OR REPLACE FUNCTION actualizar_inventario_por_factura()
  RETURNS TRIGGER AS $$
  DECLARE
    stock_actual INTEGER;
    stock_minimo INTEGER;
  BEGIN
    SELECT quantity, minimum_stock INTO stock_actual, stock_minimo 
    FROM product 
    WHERE id = NEW.product_id;

    IF stock_actual < NEW.quantity THEN
      RAISE EXCEPTION 'No hay suficiente inventario del producto %', NEW.product_id;
    END IF;

    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await db.query(`
  CREATE TRIGGER trigger_actualizar_inventario_por_factura
  AFTER INSERT ON invoice_product
  FOR EACH ROW
  WHEN (NEW.quantity > 0)
  EXECUTE FUNCTION actualizar_inventario_por_factura();
  `);

  await db.query(`
    CREATE OR REPLACE FUNCTION actualizar_inventario_compra()
    RETURNS TRIGGER AS $$
    DECLARE
    product_quantity INTEGER;
    BEGIN
    IF NEW.status = 'confirmado' AND OLD.status = 'pendiente' THEN
        FOR product_quantity IN 
            SELECT p.quantity - ip.quantity
            FROM invoice_product AS ip
            JOIN product AS p ON ip.product_id = p.id
            WHERE ip.invoice_id = NEW.id
        LOOP
            IF product_quantity < 0 THEN
                RAISE EXCEPTION 'No hay suficiente producto en el inventario';
            END IF;
        END LOOP;
    
    UPDATE product AS p
        SET quantity = p.quantity - ip.quantity
        FROM invoice_product AS ip
        WHERE ip.invoice_id = NEW.id AND ip.product_id = p.id;
    END IF;
    
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await db.query(`
    CREATE TRIGGER trigger_actualizar_inventario_compra
    AFTER UPDATE ON invoice
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_inventario_compra();
  `);

  await db.query(`
    CREATE OR REPLACE FUNCTION actualizar_inventarios()
    RETURNS TRIGGER AS $$
    DECLARE
     old_quantity NUMERIC;
    BEGIN
    SELECT quantity INTO old_quantity FROM supply WHERE id = NEW.supply_id;
  
    IF old_quantity < NEW.quantity THEN
    RAISE EXCEPTION 'No hay suficiente inventario del insumo %', NEW.supply_id;
    END IF;

    UPDATE supply
    SET quantity = quantity - NEW.quantity
    WHERE id = NEW.supply_id;

    UPDATE product
    SET quantity = (
    SELECT SUM(quantity)
    FROM formula
    WHERE product_id = NEW.product_id
    )
    WHERE id = NEW.product_id;

    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
 `);

  await db.query(`
  CREATE TRIGGER trigger_actualizar_inventarios
  AFTER INSERT ON formula
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_inventarios();
  `);

  console.log('Tablas y triggers creados correctamente');
  process.exit();
};

createTables();
