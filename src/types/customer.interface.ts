/**
 * 基本信息 个人信息
 */
export interface CustomerBase {
	/**
	 * 关系
	 */
	relation: string;
	/**
	 * 姓名
	 */
	contName: string;
	/**
	 * 联系电话
	 * 脱敏电话
	 */
	phone: string;
	desenphone: string
	/**
	 * 电话状态
	 */
	phoneStatus: string;
	/**
	 * 电话状态
	 */
	createTime: string;
}
