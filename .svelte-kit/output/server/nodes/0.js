import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.37f53dbd.js","_app/immutable/chunks/scheduler.1c8f6089.js","_app/immutable/chunks/index.62abedfa.js","_app/immutable/chunks/store.d865c582.js","_app/immutable/chunks/index.f60f3714.js"];
export const stylesheets = ["_app/immutable/assets/0.da18bbf8.css"];
export const fonts = [];
