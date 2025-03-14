import { c as create_ssr_component, e as escape, b as add_attribute, f as each, a as subscribe, v as validate_component } from "../../chunks/ssr.js";
import "@lottiefiles/dotlottie-web";
import "../../chunks/store.js";
import "d3";
import { r as readable } from "../../chunks/index.js";
import "lodash.debounce";
const Meta = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Stoogle" } = $$props;
  let { description = "Stoogle is an automated system that analyzes online articles related to a user query and generates coherent data stories based on the user's informational needs." } = $$props;
  let { url = "https://stoogle-data-story.com" } = $$props;
  let { keywords = "stoogle, data storytelling, scrollytelling, automated data stories, AI-driven insights" } = $$props;
  let { preloadFont = [] } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.keywords === void 0 && $$bindings.keywords && keywords !== void 0)
    $$bindings.keywords(keywords);
  if ($$props.preloadFont === void 0 && $$bindings.preloadFont && preloadFont !== void 0)
    $$bindings.preloadFont(preloadFont);
  return `${$$result.head += `<!-- HEAD_svelte-1uzj1ph_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="description"${add_attribute("content", description, 0)}><meta name="author" content="Stoogle Team"><meta name="news_keywords"${add_attribute("content", keywords, 0)}><meta property="og:title"${add_attribute("content", title, 0)}><meta property="og:site_name" content="Stoogle"><meta property="og:url"${add_attribute("content", url, 0)}><meta property="og:description"${add_attribute("content", description, 0)}><meta property="og:type" content="article"><meta property="og:locale" content="en_US"><meta name="robots" content="max-image-preview:large"><link rel="canonical" href="${escape(url, true) + "/"}">${each(preloadFont, (href) => {
    return `<link rel="preload"${add_attribute("href", href, 0)} as="font" type="font/woff2" crossorigin>`;
  })}<!-- HEAD_svelte-1uzj1ph_END -->`, ""}`;
});
function version() {
  console.log("--- --- --- --- --- ---");
  console.log(`svelte-starter: ${"5.14.0"}`);
  console.log(`build: ${"2025-03-14-22:06"}`);
  console.log("--- --- --- --- --- ---");
}
const Dotlottie_svelte_svelte_type_style_lang = "";
const eventPrefix = /^on/;
const events = [];
Object.keys(globalThis).forEach((key) => {
  if (eventPrefix.test(key)) {
    events.push(key.replace(eventPrefix, ""));
  }
});
const FactScroll_svelte_svelte_type_style_lang = "";
const YearColorSpectrum_svelte_svelte_type_style_lang = "";
const Facts_svelte_svelte_type_style_lang = "";
const Title_svelte_svelte_type_style_lang = "";
const Circle_svelte_svelte_type_style_lang = "";
const Belt_svelte_svelte_type_style_lang = "";
const Articles_svelte_svelte_type_style_lang = "";
const ScrollSection_svelte_svelte_type_style_lang = "";
const Stoogle_svelte_svelte_type_style_lang = "";
const viewport = readable({ width: 0, height: 0 }, (set) => {
  return () => {
  };
});
const Main = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_viewport;
  $$unsubscribe_viewport = subscribe(viewport, (value) => value);
  $$unsubscribe_viewport();
  return `${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  version();
  return `${validate_component(Meta, "Meta").$$render($$result, {}, {}, {})}  ${validate_component(Main, "Main").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
