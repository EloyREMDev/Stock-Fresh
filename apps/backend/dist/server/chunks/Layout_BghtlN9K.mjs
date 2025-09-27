import { e as createComponent, m as maybeRenderHead, k as renderScript, r as renderTemplate, f as createAstro, h as addAttribute, o as renderHead, l as renderComponent, n as renderSlot } from './astro/server_eN3rAvzK.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- TODO: Menu movil -->${maybeRenderHead()}<nav class="bg-indigo-700 text-white fixed top-0 left-0 right-0 z-50"> <div class="max-w-7xl mx-auto h-16 flex items-center justify-between"> <div class="flex items-center gap-2 h-full"> <!-- <img class="w-8 h-8" src={logoPng.src} alt="logo"> --> <h2 class="font-medium text-xl">Stock & Fresh</h2> </div> <div id="nav-links" class="flex items-center gap-4"> <div id="nav-user-container"> <p id="nav-user-name"></p> </div> <button id="logout-btn" class="md:hidden flex items-center justify-center p-1 rounded-md bg-white text-indigo-700"> <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> </button> <!-- {links.map(link => <a class="hidden md:block text-white no-underline hover:underline" href={link.path}>{link.name}</a>)} --> </div> </div> </nav> ${renderScript($$result, "C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/navigation/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/navigation/Navigation.astro", void 0);

const $$Notification = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="notification" class="fixed p-4 top-4 right-4 rounded-2xl z-[60] hidden"> <p id="notification-title">Error</p> <p id="notification-description">Hubo un error obteniendo los contactos</p> </div>`;
}, "C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/features/notifications/Notification.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="pt-16" data-astro-cid-sckkx6r4> ${renderComponent($$result, "Notification", $$Notification, { "data-astro-cid-sckkx6r4": true })} ${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-sckkx6r4": true })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
