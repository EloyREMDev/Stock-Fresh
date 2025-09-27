import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_eN3rAvzK.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D9gRjnxM.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/DELL%20897/Desktop/Proyecto%2026-09-25/contacto-fullstack-lunes/apps/frontend/","cacheDir":"file:///C:/Users/DELL%20897/Desktop/Proyecto%2026-09-25/contacto-fullstack-lunes/apps/frontend/node_modules/.astro/","outDir":"file:///C:/Users/DELL%20897/Desktop/Proyecto%2026-09-25/contacto-fullstack-lunes/apps/frontend/dist/","srcDir":"file:///C:/Users/DELL%20897/Desktop/Proyecto%2026-09-25/contacto-fullstack-lunes/apps/frontend/src/","publicDir":"file:///C:/Users/DELL%20897/Desktop/Proyecto%2026-09-25/contacto-fullstack-lunes/apps/frontend/public/","buildClientDir":"file:///C:/Users/DELL%20897/Desktop/Proyecto%2026-09-25/contacto-fullstack-lunes/apps/frontend/dist/client/","buildServerDir":"file:///C:/Users/DELL%20897/Desktop/Proyecto%2026-09-25/contacto-fullstack-lunes/apps/frontend/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"confirmations/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/confirmations","isIndex":false,"type":"page","pattern":"^\\/confirmations\\/?$","segments":[[{"content":"confirmations","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/confirmations.astro","pathname":"/confirmations","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"orders/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/orders","isIndex":false,"type":"page","pattern":"^\\/orders\\/?$","segments":[[{"content":"orders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/orders.astro","pathname":"/orders","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"products/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/products","isIndex":false,"type":"page","pattern":"^\\/products\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/products.astro","pathname":"/products","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"shop/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/shop","isIndex":false,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop.astro","pathname":"/shop","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"signup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"stock/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/stock","isIndex":false,"type":"page","pattern":"^\\/stock\\/?$","segments":[[{"content":"stock","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/stock.astro","pathname":"/stock","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/confirmations.dUtf9VzB.css"}],"routeData":{"route":"/verify/[token]","isIndex":false,"type":"page","pattern":"^\\/verify\\/([^/]+?)\\/?$","segments":[[{"content":"verify","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/verify/[token].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/confirmations.astro",{"propagation":"none","containsHead":true}],["C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/orders.astro",{"propagation":"none","containsHead":true}],["C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/products.astro",{"propagation":"none","containsHead":true}],["C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/shop.astro",{"propagation":"none","containsHead":true}],["C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/stock.astro",{"propagation":"none","containsHead":true}],["C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/verify/[token].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/confirmations@_@astro":"pages/confirmations.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/orders@_@astro":"pages/orders.astro.mjs","\u0000@astro-page:src/pages/products@_@astro":"pages/products.astro.mjs","\u0000@astro-page:src/pages/shop@_@astro":"pages/shop.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/stock@_@astro":"pages/stock.astro.mjs","\u0000@astro-page:src/pages/verify/[token]@_@astro":"pages/verify/_token_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:../../node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CnmcKRQw.mjs","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_x_YgZfRD.mjs","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.BV4R16pJ.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/signup.astro?astro&type=script&index=0&lang.ts":"_astro/signup.astro_astro_type_script_index_0_lang.hErIA1xP.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/verify/[token].astro?astro&type=script&index=0&lang.ts":"_astro/_token_.astro_astro_type_script_index_0_lang.C-uxCPi-.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/auth/AuthProtected.astro?astro&type=script&index=0&lang.ts":"_astro/AuthProtected.astro_astro_type_script_index_0_lang.3V1h3DgD.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/orders/CreateInvoiceProductForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateInvoiceProductForm.astro_astro_type_script_index_0_lang.VcmZVS3W.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/auth/AuthUnprotected.astro?astro&type=script&index=0&lang.ts":"_astro/AuthUnprotected.astro_astro_type_script_index_0_lang.CehkKowi.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/stock/SupplyList.astro?astro&type=script&index=0&lang.ts":"_astro/SupplyList.astro_astro_type_script_index_0_lang.BSCNuvOj.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/stock/CreateSupplyForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateSupplyForm.astro_astro_type_script_index_0_lang.augqjmEz.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/stock/FormulaRegister.astro?astro&type=script&index=0&lang.ts":"_astro/FormulaRegister.astro_astro_type_script_index_0_lang.qa7ScDFn.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/contacts/ProductList.astro?astro&type=script&index=0&lang.ts":"_astro/ProductList.astro_astro_type_script_index_0_lang.DAIaAg_w.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/contacts/CreateProductForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateProductForm.astro_astro_type_script_index_0_lang.CYLZd7Q9.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/contacts/BcvRate.astro?astro&type=script&index=0&lang.ts":"_astro/BcvRate.astro_astro_type_script_index_0_lang.DuNk1tDb.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/orders/UpdateInvoice.astro?astro&type=script&index=0&lang.ts":"_astro/UpdateInvoice.astro_astro_type_script_index_0_lang.C16XT4ma.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/navigation/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.DqctsxkB.js","C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/shop/ProductItem.astro?astro&type=script&index=0&lang.ts":"_astro/ProductItem.astro_astro_type_script_index_0_lang.C2lhXWFk.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/confirmations.dUtf9VzB.css","/favicon.svg","/_astro/auth.module.BtoUEjjw.js","/_astro/AuthProtected.astro_astro_type_script_index_0_lang.3V1h3DgD.js","/_astro/AuthUnprotected.astro_astro_type_script_index_0_lang.CehkKowi.js","/_astro/BcvRate.astro_astro_type_script_index_0_lang.DuNk1tDb.js","/_astro/CreateInvoiceProductForm.astro_astro_type_script_index_0_lang.VcmZVS3W.js","/_astro/CreateProductForm.astro_astro_type_script_index_0_lang.CYLZd7Q9.js","/_astro/CreateSupplyForm.astro_astro_type_script_index_0_lang.augqjmEz.js","/_astro/endpoints.QH1VciTq.js","/_astro/FormulaRegister.astro_astro_type_script_index_0_lang.qa7ScDFn.js","/_astro/index.B9b1t7QR.js","/_astro/index.CViUNx8d.js","/_astro/login.astro_astro_type_script_index_0_lang.BV4R16pJ.js","/_astro/Navigation.astro_astro_type_script_index_0_lang.DqctsxkB.js","/_astro/notificiation.DyHDLNjw.js","/_astro/ProductItem.astro_astro_type_script_index_0_lang.C2lhXWFk.js","/_astro/ProductList.astro_astro_type_script_index_0_lang.DAIaAg_w.js","/_astro/products.module.oR8XwO8S.js","/_astro/signup.astro_astro_type_script_index_0_lang.hErIA1xP.js","/_astro/supply.module.BHq-_SKP.js","/_astro/SupplyList.astro_astro_type_script_index_0_lang.BSCNuvOj.js","/_astro/UpdateInvoice.astro_astro_type_script_index_0_lang.C16XT4ma.js","/_astro/_token_.astro_astro_type_script_index_0_lang.C-uxCPi-.js","/confirmations/index.html","/login/index.html","/orders/index.html","/products/index.html","/shop/index.html","/signup/index.html","/stock/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"n+MyjiVkc6tjWdMrkiQx/kdbPi+qh9AIBm5UMNZ4V4Y=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\DELL 897\\Desktop\\Proyecto 26-09-25\\contacto-fullstack-lunes\\apps\\frontend\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
