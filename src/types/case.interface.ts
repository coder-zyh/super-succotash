/**
 * 案件基础数据
 */
export interface CaseBaseInfo {
	name: string;
	id: string;
	type: TaskType;
	/**
	 * 客户姓名
	 */
	personalName: string;
	/**
	 * 性别
	 */
	sex: string;
	/**
	 * 年龄
	 */
	age: string;
	/**
	 * 婚姻状况
	 */
	marital: string;
	/**
	 * 逾期金额
	 */
	overdueAmount: string;
	/**
	 * 逾期期数
	 */
	overduePeriod: string;
	/**
	 * 逾期天数
	 */
	overdueDays: string;
	/**
	 * 客户地址
	 */
	detail: string;

	// ...
}
