import { ConfigEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { version } from "./package.json";
import pxToViewPort from "postcss-px-to-viewport";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
	if (command === "build") {
		// merge build info
		process.env.VITE_APP_BUILD_VERSION = version;
		process.env.VITE_APP_BUILD_DATE = new Date().toLocaleString();
	}

	return {
		css: {
			postcss: {
				plugins: [pxToViewPort({ viewportWidth: 375 })],
			},
		},
		plugins: [
			vue(),
			Components({
				dts: false,
				resolvers: [VantResolver()],
			}),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
			},
		},
		server: {
			proxy: {
				"/myte_api": "http://192.168.3.101:8888",
			},
		},
	};
};
