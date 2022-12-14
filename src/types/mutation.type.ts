import { MutationTree } from "vuex";
import { DictData } from "./dict.interface";
import { RootState } from "./state.type";
import { UserInfo } from "./user.interface";

/**
 * store 里面更新RootState的提交方法名称
 */
export enum RootMutationType {
	/**
	 * 设置系统状态
	 */
	SET_READY = "SET_READY",
	/**
	 * 更新数据字典数据
	 */
	SET_DICTDATA = "SET_DICTDATA",
	/** 更新用户 */
	UPDATE_USER = "UDPATE_USER",
}

/**
 * 修改rootState的提交方法类型定义
 */
export interface RootMutations<S = RootState> extends MutationTree<S> {
	[RootMutationType.SET_READY](state: S, ready: boolean): void;
	[RootMutationType.SET_DICTDATA](state: S, dictData: DictData): void;
	[RootMutationType.UPDATE_USER](state: S, user: UserInfo): void;
}
