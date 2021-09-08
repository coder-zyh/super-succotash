import { Request, RequestParams } from "@gopowerteam/http-request";
import { Observable } from "rxjs";
import { AppController } from "../controllers/app.controller";

export class AppService {
	/**
	 * 查询风险规则信息(可用于手动风险上报)
	 */
	@Request({
		server: AppController.getWaitCaseAmount,
	})
	public getWaitCaseAmount(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}

	/**
	 * 风险案件总数
	 * 查询登录客户经理本人的催收中的风险案件总数
	 */
	@Request({
		server: AppController.getRiskCaseTotal,
	})
	public getRiskCaseTotal(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 逾期案件总数
	 * 查询登录客户经理本人的催收中的外访案件总数
	 */
	@Request({
		server: AppController.getOverdueCaseTotal,
	})
	public getOverdueCaseTotal(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 合计案件总数
	 * 查询登录客户经理本人的催收中的外访和风险案件总数
	 */
	@Request({
		server: AppController.getAllCaseTotal,
	})
	public getAllCaseTotal(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 今日新增逾期/风险案件数
	 * 获取今日新分配给登录客户经理的(外访/风险)案件
	 */
	@Request({
		server: AppController.getNewlyCaseCount,
		force: true,
	})
	public getNewlyCaseCount(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 今日跟进逾期/风险案件数
	 * 查询登录客户经理本人今日添加外访催记的(外访/风险)案件数
	 */
	@Request({
		server: AppController.getNewFollowupCaseCount,
		force: true,
	})
	public getNewFollowupCaseCount(
		requestParams: RequestParams
	): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 今日待跟进逾期/风险案件数
	 * 查询登录客户经理本人今日未添加外访催记的(外访/风险)案件数
	 */
	@Request({
		server: AppController.getNewWaitFollowupCount,
		force: true,
	})
	public getNewWaitFollowupCount(
		requestParams: RequestParams
	): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 基本信息
	 * 个人信息
	 */
	@Request({
		server: AppController.getPersonalInfo,
	})
	public getPersonalInfo(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 基本信息
	 * 联系人信息
	 */
	@Request({
		server: AppController.getPersonalContacts,
	})
	public getPersonalContacts(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 基本信息
	 * 地址信息
	 */
	@Request({
		server: AppController.getPersonalAddress,
	})
	public getPersonalAddress(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 基本信息
	 * 抵质押物地址信息
	 */
	@Request({
		server: AppController.getGuaranteeAddress
		,
	})
	public getGuaranteeAddress(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 基本信息
	 * 新增信息
	 */
	@Request({
		server: AppController.repairInfo,
	})
	public repairInfo(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 案件信息
	 */
	@Request({
		server: AppController.queryCaseInfo,
	})
	public queryCaseInfo(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 跟进记录
	 */
	@Request({
		server: AppController.caseFollowupRecord,
	})
	public caseFollowupRecord(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 新增跟进记录
	 */
	@Request({
		server: AppController.addAppCaseFollowupRecord,
	})
	public addAppCaseFollowupRecord(
		requestParams: RequestParams
	): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 查看跟进记录
	 */
	@Request({
		server: AppController.viewAppCaseFollowupRecord,
	})
	public viewAppCaseFollowupRecord(
		requestParams: RequestParams
	): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 任务列表(逾期/风险)
	 */
	@Request({
		server: AppController.getOverdueCaseList,
	})
	public getOverdueCaseList(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 获取数据字典
	 */
	@Request({
		server: AppController.getAll,
	})
	public getAll(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
 * 通过文件名获取文件流
 */
	@Request({
		server: AppController.getFileUrl,
	})
	public getFileUrl(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
}
