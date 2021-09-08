/* eslint-disable no-var */
declare var VConsole: any;

/**
 * 使用 vConsole
 */
export default function () {
	if (import.meta.env.MODE !== "prod") {
		// var vConsole = new VConsole();
	}
}
