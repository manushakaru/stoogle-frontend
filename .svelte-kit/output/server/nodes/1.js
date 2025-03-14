

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.e8f60e0d.js","_app/immutable/chunks/scheduler.1c8f6089.js","_app/immutable/chunks/index.62abedfa.js","_app/immutable/chunks/singletons.45767b7c.js","_app/immutable/chunks/index.f60f3714.js"];
export const stylesheets = [];
export const fonts = [];
