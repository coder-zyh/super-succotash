/**
 * 基本信息  联系人信息
 */
export interface AddressBase {
	/**
	 * 联系地址id
	 */
	id: string;
	/**
	 * 姓名
	 */
	contName: string;
	/**
	 * 关系
	 */
	relation: string;
	/**
	 * 客户id
	 */
	personalId: string;
	/**
	 *  数据来源
	 */
	dataSource: string;
	/**
	 *  地址状态
	 */
	addressStatus: string;
	/**
	 *  地址类型
	 */
	addressType: string;
	/**
	 * 详细地址
	 */
	detail: string;
	/**
	 * 外访申请标识
	 */
	applyStatus: string;
	/**
	 * 创建时间
	 */
	createTime: string;
}
