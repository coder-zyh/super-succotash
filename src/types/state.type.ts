import { DictData } from "@/types/dict.interface";
import { UserInfo } from "@/types/user.interface";

export type RootState = {
	/**
	 * 系统准备状态
	 */
	ready: boolean;
	/**
	 * 系统数据字典
	 */
	dict: DictData;

	user: UserInfo;
};
