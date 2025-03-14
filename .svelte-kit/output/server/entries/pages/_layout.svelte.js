import { c as create_ssr_component, a as subscribe, b as add_attribute } from "../../chunks/ssr.js";
import { t as theme } from "../../chunks/store.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  return `<main id="content"${add_attribute("class", $theme, 0)}>${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
