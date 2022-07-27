/**已审批item格式 */
export interface ApprovalItemInfo {
	userName: string;
	projectName: string;
	code: string;
	day: number;
	amount?: number;
	fromDate: number;
}
