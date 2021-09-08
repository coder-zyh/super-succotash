import { App } from "vue";

const components = import.meta.globEager("./components/*.vue");

export default {
	/**
	 * 注册系统公共组件
	 * @param app
	 */
	install(app: App): void {
		Object.entries(components).forEach(([k, m]) =>
			app.component(k.replace(/(.*\/)*([^.]+).vue$/, "$2"), m.default)
		);
	},
};
