import { App } from "@vue/runtime-core";
import vantLib from "./vant-lib";
import zwComponents from "./zw-components";
import httpBoot from "./http.boot";
import authBoot from "./auth.boot";
import vConsoleBoot from "./v-console.boot";

export const boot = (app: App) => {
	if (!import.meta.env.DEV)
		console.table({
			版本号: import.meta.env.VITE_APP_BUILD_VERSION,
			打包时间: import.meta.env.VITE_APP_BUILD_DATE,
		});

	// 更改系统标题
	document.title = import.meta.env.VITE_APP_SYSNAME;

	// 使用http服务
	httpBoot();

	// if (!import.meta.env.DEV) {
	authBoot();
	// }

	// 启用vConsole
	// vConsoleBoot();

	// 使用vant 组件
	app.use(vantLib);
	// 使用公共组件
	app.use(zwComponents);
};
