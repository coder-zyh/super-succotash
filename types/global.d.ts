/** Picker 选择器返回值类型 */
type PickerResult = {
	/** 选择项的文字 */
	text: string;
	/** 选中项的实际值 */
	value: string;
};

/**
 * 网络响应普通结构体
 */
type HttpResonseType<T> = {
	/** 错误消息 */
	msg: string;
	/** 响应数据 */
	obj: T;
	/** 业务处理状态 */
	success: boolean;
};

/**
 * 网络查询响应结构
 */
type HttpQueryResponse<T> = {
	total: number;
	rows: T[];
	success: boolean;
	msg: string;
};
