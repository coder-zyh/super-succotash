import { RequestMethod } from "@gopowerteam/http-request";

// 控制器名称
const controller = "app-controller";
const service = "domain-service";

/**
 * 微信认证服务相关 使用的controller
 */
export const WxAuthController = {
	/**
	 * 获取签名
	 */
	getSignInfo: {
		service,
		controller,
		path: "/api/appController/getSign",
		action: "getSign",
		type: RequestMethod.Get,
	},
	/**
	 * 获取token
	 */
	appLogin: {
		service,
		controller,
		path: "/api/appController/appLogin",
		action: "appLogin",
		type: RequestMethod.Get,
	},
	/**
	 * 地址解析
	 */
	getAddressToLatitude: {
		service,
		controller,
		path: "/api/appController/getAddressToLatitude",
		action: "getAddressToLatitude",
		type: RequestMethod.Get,
	},
	/**
	 * 逆地址解析
	 */
	getLatAndLngToAddress: {
		service,
		controller,
		path: "/api/appController/getLatAndLngToAddress",
		action: "getLatAndLngToAddress",
		type: RequestMethod.Get,
	},
};
