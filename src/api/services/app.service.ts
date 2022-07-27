import { ExpenseTypeInfo, MyteProjectInfo } from "@/types/project.interface";
import { UserInfo } from "@/types/user.interface";
import NetService from "@/utils/net.service";
import { filter, map } from "rxjs/operators";
import { AppController } from "../controllers/app.controller";

export class AppService {
	/**
	 * 用户登录
	 * @param uname
	 * @param pwd
	 * @returns
	 */
	public login(uname: string, pwd: string) {
		const form = new FormData();
		form.append("username", uname);
		form.append("password", pwd);

		return NetService.request<HttpResonseType<any>>(
			AppController.login,
			form
		).pipe(
			filter((v) => {
				if (v.success) return true;
				else throw v.msg;
			}),
			map<HttpResonseType<any>, UserInfo>((v) => v.obj)
		);
	}

	/** 获取项目列表 */
	public getProjectList() {
		return NetService.request<MyteProjectInfo[]>(AppController.getProjectList);
	}

	/** 获取费用类型 */
	public getExpenseType() {
		return NetService.request<HttpQueryResponse<any>>(
			AppController.expensetype
		).pipe(
			filter((v) => {
				if (v.success) return true;
				else throw v.msg;
			}),
			map<HttpQueryResponse<any>, ExpenseTypeInfo[]>((v) => v.rows)
		);
	}

	/** 保存日报信息 */
	public saveDayReport(data: any) {
		return NetService.request<HttpResonseType<null>>(
			AppController.saveDayReport,
			data
		).pipe(
			filter((v) => {
				if (v.success) return true;
				else throw v.msg;
			})
		);
	}

	// 获取审批数据
	public getApprovalList() {
		return NetService.request<HttpQueryResponse<any>>(
			AppController.approvalList
		);
	}
}
