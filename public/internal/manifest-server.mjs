// This file is generated by Sapper — do not edit it!
import component_0 from "../../src/routes/index.svelte";
import component_1, { preload as preload_1 } from "../../src/routes/chat/[name].svelte";
import root from "../../src/routes/_layout.svelte";
import error from "../../src/routes/_error.svelte";

const d = decodeURIComponent;

export const manifest = {
	server_routes: [
		
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: component_0 }
			]
		},

		{
			// chat/[name].svelte
			pattern: /^\/chat\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "chat_$name", file: "chat/[name].svelte", component: component_1, preload: preload_1, params: match => ({ name: d(match[1]) }) }
			]
		}
	],

	root,
	root_preload: () => {},
	error
};

export const build_dir = "__sapper__/build";

export const src_dir = "src";

export const dev = false;