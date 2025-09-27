import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_x8r8oerU.mjs';
import { manifest } from './manifest_CnmcKRQw.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/confirmations.astro.mjs');
const _page2 = () => import('./pages/login.astro.mjs');
const _page3 = () => import('./pages/orders.astro.mjs');
const _page4 = () => import('./pages/products.astro.mjs');
const _page5 = () => import('./pages/shop.astro.mjs');
const _page6 = () => import('./pages/signup.astro.mjs');
const _page7 = () => import('./pages/stock.astro.mjs');
const _page8 = () => import('./pages/verify/_token_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../../node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/confirmations.astro", _page1],
    ["src/pages/login.astro", _page2],
    ["src/pages/orders.astro", _page3],
    ["src/pages/products.astro", _page4],
    ["src/pages/shop.astro", _page5],
    ["src/pages/signup.astro", _page6],
    ["src/pages/stock.astro", _page7],
    ["src/pages/verify/[token].astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "middleware",
    "client": "file:///C:/Users/DELL%20897/Desktop/Proyecto%2026-09-25/contacto-fullstack-lunes/apps/frontend/dist/client/",
    "server": "file:///C:/Users/DELL%20897/Desktop/Proyecto%2026-09-25/contacto-fullstack-lunes/apps/frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
