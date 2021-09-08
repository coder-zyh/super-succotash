import { RequestMethod } from "@gopowerteam/http-request";

// 控制器名称
const controller = "app-controller";
const service = "domain-service";

/**
 * H5 使用的controller
 */
export const AppController = {
	/**
	 * 待催收金额(获取所有外访、风险案件)
	 */
	getWaitCaseAmount: {
		service,
		controller,
		path: "/api/appController/getWaitCaseAmount",
		action: "getWaitCaseAmount",
		type: RequestMethod.Get,
	},
	/**
	 * 风险案件总数
	 * 查询登录客户经理本人的催收中的风险案件总数
	 */
	getRiskCaseTotal: {
		service,
		controller,
		path: "/api/appController/getRiskCaseTotal",
		action: "getRiskCaseTotal",
		type: RequestMethod.Get,
	},
	/**
	 * 逾期案件总数
	 * 查询登录客户经理本人的催收中的外访案件总数
	 */
	getOverdueCaseTotal: {
		service,
		controller,
		path: "/api/appController/getOverdueCaseTotal",
		action: "getOverdueCaseTotal",
		type: RequestMethod.Get,
	},
	/**
	 * 合计案件总数
	 * 查询登录客户经理本人的催收中的外访和风险案件总数
	 */
	getAllCaseTotal: {
		service,
		controller,
		path: "/api/appController/getAllCaseTotal",
		action: "getAllCaseTotal",
		type: RequestMethod.Get,
	},
	/**
	 * 今日新增逾期/风险案件数
	 * 获取今日新分配给登录客户经理的外访/风险案件
	 */
	getNewlyCaseCount: {
		service,
		controller,
		path: "/api/appController/getNewlyCaseCount",
		action: "getNewlyCaseCount",
		type: RequestMethod.Get,
	},
	/**
	 * 今日跟进逾期/风险案件数
	 * 查询登录客户经理本人今日添加外访催记的外访/风险案件数
	 */
	getNewFollowupCaseCount: {
		service,
		controller,
		path: "/api/appController/getNewFollowupCaseCount",
		action: "getNewFollowupCaseCount",
		type: RequestMethod.Get,
	},
	/**
	 * 今日待跟进逾期/风险案件数
	 * 查询登录客户经理本人今日未添加外访催记的外访/风险案件数
	 */
	getNewWaitFollowupCount: {
		service,
		controller,
		path: "/api/appController/getNewWaitFollowupCount",
		action: "getNewWaitFollowupCount",
		type: RequestMethod.Get,
	},
	/**
	 * 基本信息
	 * 个人信息
	 */
	getPersonalInfo: {
		service,
		controller,
		path: "/api/appController/getPersonalInfo",
		action: "getPersonalInfo",
		type: RequestMethod.Get,
	},
	/**
	 * 基本信息
	 * 联系人信息
	 */
	getPersonalContacts: {
		service,
		controller,
		path: "/api/appController/getPersonalContacts",
		action: "getPersonalContacts",
		type: RequestMethod.Get,
	},
	/**
	 * 基本信息
	 * 地址信息
	 */
	getPersonalAddress: {
		service,
		controller,
		path: "/api/appController/getPersonalAddress",
		action: "getPersonalAddress",
		type: RequestMethod.Get,
	},
	/**
	 * 基本信息
	 * 新增信息
	 */
	repairInfo: {
		service,
		controller,
		path: "/api/appController/repairInfo",
		action: "repairInfo",
		type: RequestMethod.Post,
	},
	/**
 * 基本信息
 * 抵质押物地址信息
 */
	getGuaranteeAddress: {
		service,
		controller,
		path: "/api/appController/getGuaranteeAddress",
		action: "repairInfo",
		type: RequestMethod.Get,
	},

	/**
	 * 案件信息
	 */
	queryCaseInfo: {
		service,
		controller,
		path: "/api/appController/queryCaseInfo",
		action: "queryCaseInfo",
		type: RequestMethod.Get,
	},
	/**
	 * 跟进记录
	 */
	caseFollowupRecord: {
		service,
		controller,
		path: "/api/appController/caseFollowupRecord",
		action: "caseFollowupRecord",
		type: RequestMethod.Get,
	},
	/**
	 * 新增跟进记录
	 */
	addAppCaseFollowupRecord: {
		service,
		controller,
		path: "/api/appController/addAppCaseFollowupRecord",
		action: "addAppCaseFollowupRecord",
		type: RequestMethod.Post,
	},
	/**
	 * 查看跟进记录
	 */
	viewAppCaseFollowupRecord: {
		service,
		controller,
		path: "/api/appController/viewAppCaseFollowupRecord",
		action: "viewAppCaseFollowupRecord",
		type: RequestMethod.Get,
	},
	/**
	 * 任务列表(逾期/风险)
	 */
	getOverdueCaseList: {
		service,
		controller,
		path: "/api/appController/getOverdueCaseList",
		action: "getOverdueCaseList",
		type: RequestMethod.Get,
	},
	/**
	 * 获取数据字典数据
	 */
	getAll: {
		service: "common-service",
		controller: "dataDictController",
		path: "/api/dataDictController/getAll",
		action: "getAll",
		type: RequestMethod.Get,
	},
	/**
	 * 通过文件名获取文件流
	 */
	getFileUrl: {
		service: "common-service",
		controller,
		path: "/api/CosController/getFileUrl",
		action: "getFileUrl",
		type: RequestMethod.Get,
	},
};
