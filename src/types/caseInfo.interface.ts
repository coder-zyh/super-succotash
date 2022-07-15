/**
 * 案件信息
 */
export interface CaseInfoBase {
	/**
	 * 客户编号
	 */
	personalInfoPersonalNo: string;
	/**
	 * 贷款交易编号
	 */
	caseNumber: string;
	/**
	 * 签约合同号
	 */
	loanDealNo: string;
	/**
	 * 五级分类
	 */
	levelFiveClass: string;
	/**
	 * 产品名称
	 */
	prodBclass: string;
	/**
	 * 贷款金额（元）
	 */
	loanAmount: string;
	/**
	 * 贷款余额（元）
	 */
	loanBalCny: string;
	/**
	 * 执行年利率
	 */
	yearRateStr: string;
	/**
	 * 贷款起始日
	 */
	loanDate: string;
	/**
	 * 贷款到期日
	 */
	loanEndDt: string;
	/**
	 * 还本频率
	 */
	payWay: string;

	// 逾期信息
	/**
	 * 实际逾期本金折CNY
	 */
	actualOvdueAmt: string;
	/**
	 * 逾期前应收未收利息
	 */
	dueShdRecInt: string;
	/**
	 * AA罚息
	 */
	defIntAmt: string;
	/**
	 * AA复利
	 */
	compIntAmt: string;
	/**
	 * 逾期总金额
	 */
	overdueAmount: string;
	/**
	 * 欠息余额折CNY
	 */
	oweIntBalCny: string;
	/**
	 * 挂息余额折CNY
	 */
	hangIntBalCny: string;
	/**
	 * 逾期天数
	 */
	overdueDays: string;
	/**
	 * 逾期阶段
	 */
	overduePeriodStr: string;
	/**
	 * 最早逾期日期
	 */
	dueDate: string;
	/**
	 * 最近还款金额
	 */
	latelyPayAmount: string;
	/**
	 * 最近还款日
	 */
	latelyPayDate: string;
}
