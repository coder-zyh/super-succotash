import { IRequestServerConfig, RequestMethod } from "@gopowerteam/http-request";

// 控制器名称
const controller = "";
const service = "myte_war";

/**
 * H5 使用的controller
 */
export const AppController: {
	/** H5登录 */
	login: IRequestServerConfig;
	/** 获取所有项目 */
	getProjectList: IRequestServerConfig;
	/** 获取预估费用 */
	expensetype: IRequestServerConfig;
	/** 填报工时  */
	saveDayReport: IRequestServerConfig;
} = {
	login: {
		service,
		controller,
		path: "/myte_war/login",
		action: "login",
		type: RequestMethod.Post,
	},
	getProjectList: {
		service,
		controller,
		path: "/myte_war/api/assignment/user/list",
		action: "list",
		type: RequestMethod.Get,
	},
	expensetype: {
		service,
		controller,
		path: "/myte_war/api/timesheet/expense/expensetype/list",
		action: "list",
		type: RequestMethod.Get,
	},
	saveDayReport: {
		service,
		controller,
		path: "/myte_war/api/mobile/mobileSave",
		action: "mobileSave",
		type: RequestMethod.Post,
	},
};
