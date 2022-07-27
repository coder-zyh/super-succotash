export interface UserInfo {
	/** 姓名 */
	realName: string;
	phone: string;
	username: string;
	email: string;
	gender: "男" | "女";
	isAdmin: boolean;
}
