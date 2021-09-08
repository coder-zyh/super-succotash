/**
 * 新增信息
 */
export interface RepairInfo {
	/**
	 * id
	 */
	caseId: string;
	/**
	 * 姓名
	 */
	contName: string;
	/**
	 * 关系
	 */
	relation: string;
	/**
	 * 电话类型
	 */
	phoneType: string;
	/**
	 * 客户id
	 */
	personalId: string;
	/**
	 *  输入号码
	 */
	phone: string;
	/**
	 *  数据来源
	 */
	dataSource: string;
	/**
	 *  地址状态
	 */
	// addressStatus: string;
	/**
	 *  地址类型
	 */
	addressType: string;
	/**
	 * 详细地址
	 */
	detail: string;
	/**
	 * 联系地址
	 */
	// region: string;
}
