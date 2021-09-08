import { RequestMethod } from "@gopowerteam/http-request";

// 控制器名称
const controller = "app-controller";
const service = "domain-service";

/**
 * 微信认证服务相关 使用的controller
 */
export const WxAuthController = {
	/**
	 * 获取用户信息
	 */
	getUserInfo: {
		service,
		controller,
		path: "/api/appController/getSign",
		action: "getUserInfo",
		type: RequestMethod.Get,
	},
};
