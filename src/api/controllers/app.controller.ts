import { RequestMethod } from "@gopowerteam/http-request";

// 控制器名称
const controller = "";
const service = "myte_war";

/**
 * H5 使用的controller
 */
export const AppController = {
	/**
	 * H5登录
	 */
	login: {
		service,
		controller,
		path: "/myte_war/login",
		action: "login",
		type: RequestMethod.Post,
	},
	/** 获取所有项目 */
	getProjectList: {
		service,
		controller,
		path: "/api/assignment/user/list",
		action: "list",
		type: RequestMethod.Get,
	},
};
