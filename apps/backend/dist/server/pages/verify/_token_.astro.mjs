import { e as createComponent, l as renderComponent, k as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_eN3rAvzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_BghtlN9K.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$token = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "App" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="h-[calc(100vh-4rem)] flex flex-col gap-8 p-4 max-w-[90rem] mx-auto md:items-center justify-center"> <div class="border-1 p-4 rounded-md"> <p id="verify-text" class="text-center">Verificando el correo</p> </div> </main> ` })} ${renderScript($$result, "C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/verify/[token].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/verify/[token].astro", void 0);

const $$file = "C:/Users/DELL 897/Desktop/Proyecto 26-09-25/contacto-fullstack-lunes/apps/frontend/src/pages/verify/[token].astro";
const $$url = "/verify/[token]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$token,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
