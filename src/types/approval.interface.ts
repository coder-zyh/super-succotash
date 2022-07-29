/**	审批item格式 */
export interface ApprovalItemInfo {
	userName: string;
	userId: string;
	projectName: string;
	code: string;
	day: number;
	amount?: number;
	fromDate: number;
	approvalDate: number;
}
/**	提交审批请求体格式 */
export interface submitApproval {
	status: number;
	applies: object;
}
