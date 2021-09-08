/**
 * 案件信息
 */
export interface FollowRecord {
	/**
	 * 主键
	 */
	id: string;
	/**
	 * 案件id
	 */
	caseId: string;
	/**
	 * 逾期期数
	 */
	overduePeriod: string;
	/**
	 * 所属机构
	 */
	deptName: string;
	/**
	 * 行动类型
	 */
	followupType: string;
	/**
	 *  催记时间
	 */
	followTime: string;
	/**
	 * 操作人
	 */
	operatorRealName: string;
	/**
	 * 姓名
	 */
	targetName: string;
	/**
	 *  关系
	 */
	relationship: string;
	/**
	 * 地址
	 */
	addressDetail: string;

	/**
	 * 地址类型
	 */
	addressType: string;
}
