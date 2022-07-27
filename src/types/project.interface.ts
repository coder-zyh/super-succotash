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

/** Myte项目信息 */
export interface MyteProjectInfo {
	/** 项目ID */
	id: string;
	/** Myte Code */
	code: string;
	/** 项目名称 */
	name: string;
	/**
	 * 是否公共项目
	 * @value N 否
	 * @value Y 是
	 */
	ispublic: "N" | "Y";
}

/** 费用类型 */
export interface ExpenseTypeInfo {
	/** ID */
	id: string;
	/** 状态 */
	status: string;
	/** 费用说明 */
	comment: string;
	/** 费用名称 */
	name: string;
}
/**	报销列表 */
export interface feeListItem {
	// 报销id
	id: string;
	/** Myte Code */
	code: string;
	/** 项目名称 */
	name: string;
	/** 报销金额 */
	money: number;
	/** 报销类型 */
	feeType: string;
	/** 报销日期 */
	date: string;
}
