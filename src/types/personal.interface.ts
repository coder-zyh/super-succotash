/**
 * 基本信息  联系人信息
 */
export interface PersonalBase {
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
	 * 婚姻状态
	 */
	marital: string;
	/**
	 * 学历
	 */
	education: string;
	/**
	 * 手机号码
	 * 脱敏电话
	 */
	mobileNo: string;
	desenphone: string;
	/**
	 * 身份证号码
	 */
	idCard: string;
	/**
	 * 家庭地址
	 */
	detail: string;
}
