import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.ad327227.js","_app/immutable/chunks/scheduler.1c8f6089.js","_app/immutable/chunks/index.62abedfa.js","_app/immutable/chunks/store.d865c582.js","_app/immutable/chunks/index.f60f3714.js"];
export const stylesheets = ["_app/immutable/assets/2.0dd65d2b.css"];
export const fonts = [];
