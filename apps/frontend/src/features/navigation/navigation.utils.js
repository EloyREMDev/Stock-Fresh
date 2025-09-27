/** 
  * @typedef Link
  * @type {object}
  * @property {'link' | 'button'} type El tipo de link
  * @property {string} text Lo que va dentro del link
  * @property {string | null} path El href del link
  * @property {function | null} handler La funcion del boton
*/

import AuthModule from "../auth/auth.module.js";

/**
 * @param {string} pathname La url actual.
 * @returns {Link[]}
 */
export const getLinks = (pathname) => {
  /** @type {Link[]} */
  let links = [];
  if (pathname === '/products') {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    links.push({text: 'Inventario', path: '/stock'});
    links.push({text: 'Tienda', path: '/shop'});
    links.push({text: 'Pedidos', path: '/orders'});
  }

    if (pathname === '/stock') {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    links.push({text: 'Producto', path: '/products'});
    links.push({text: 'Tienda', path: '/shop'});
    links.push({text: 'Pedidos', path: '/orders'});
  }

      if (pathname === '/shop') {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    links.push({text: 'Producto', path: '/products'});
    links.push({text: 'Inventario', path: '/stock'});
    links.push({text: 'Pedidos', path: '/orders'});
  }

      if (pathname === '/orders') {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    links.push({text: 'Producto', path: '/products'});
    links.push({text: 'Tienda', path: '/shop'});
    links.push({text: 'Inventario', path: '/stock'});
  }

  if (pathname === '/login') {
    links.push({text: 'Home', path: '/'});
    links.push({text: 'Registro', path: '/signup'});
  }

  if (pathname === '/signup') {
    links.push({text: 'Home', path: '/'});
    links.push({text: 'Login', path: '/login'});
  }

  if (pathname === '/') {
    links.push({text: 'Login', path: '/login'});
    links.push({text: 'Registro', path: '/signup'});
  }

  return links;
}