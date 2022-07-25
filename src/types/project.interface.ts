export interface ProjectItem {
	/** 填报项标识 */
	id: string;
	/** 项目名称 */
	name: string;
	/** Myte code */
	code: string;
	/** code使用日期 */
	date: string;
	/** 当日工时
	 * @value 最大值24，可保留一位小数
	 */
	timeCount: number;

	/** 当前项目费用合计 */
	totalAmount?: number;
}

export interface FeeItem {
	id: string;
	/** 费用类型 */
	type: string;
	/** 预估金额 */
	amount: string;
	/** 所属项目 */
	projectId: string;
}
