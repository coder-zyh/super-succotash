/**
 * 首页统计信息
 */
export interface CountInfo {
	/**
	 * 待催收金额
	 */
	overdueAmount: string;
	/**
	 * 风险案件总数
	 */
	caseCountRisk: number;
	/**
	 * 逾期案件总数
	 */
	caseCountOverdue: number;
	/**
	 * 合计案件总数
	 */
	caseCountTotal: number;
	/**
	 * 今日新增逾期案件数
	 */
	caseCountOverdueNew: number;
	/**
	 * 今日跟进逾期案件数
	 */
	caseCountOverdueFollow: number;
	/**
	 * 今日待跟进逾期案件数
	 */
	caseCountOverdueWaitFollow: number;
	/**
	 * 今日新增逾期案件数
	 */
	caseCountRiskNew: number;
	/**
	 * 今日跟进逾期案件数
	 */
	caseCountRiskFollow: number;
	/**
	 * 今日待跟进逾期案件数
	 */
	caseCountRiskWaitFollow: number;
}
