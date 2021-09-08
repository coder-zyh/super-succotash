/**
 * 跟进记录详情
 */
export interface FollowRecordView {
	/**
	 * id
	 */
	caseId?: string;
	/**
	 * 催收对象
	 */
	relationship: string;
	/**
	 * 姓名
	 */
	targetName: string;
	/**
	 * 详细地址
	 */
	addressDetail: string;
	/**
	 *  地址状态
	 */
	addressStatus: string;
	/**
	 *  地址类型
	 */
	addressType: string;
	/**
	 * 催收进展
	 */
	// collectionProgress: string;

	/**
	 * 其他需说明事项
	 */
	collectionProgress: string;
	/**
	 * 附件（包括图片、录音）
	 */
	mediaIds: Array<string>;
}
