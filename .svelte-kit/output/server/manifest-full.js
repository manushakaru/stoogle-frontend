export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/stoogle/Stoogle.svg","assets/stoogle/info_outline.svg","assets/stoogle/info_outline_2.svg","assets/stoogle/launch.svg","assets/stoogle/loader.svg","assets/stoogle/options.svg","assets/stoogle/searching.lottie","assets/stoogle/stoogle_icon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.e0e68d5b.js","app":"_app/immutable/entry/app.2b42235d.js","imports":["_app/immutable/entry/start.e0e68d5b.js","_app/immutable/chunks/scheduler.1c8f6089.js","_app/immutable/chunks/singletons.45767b7c.js","_app/immutable/chunks/index.f60f3714.js","_app/immutable/entry/app.2b42235d.js","_app/immutable/chunks/scheduler.1c8f6089.js","_app/immutable/chunks/index.62abedfa.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
