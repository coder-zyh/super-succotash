export interface DictData {
	[key: string]: DictItem[];
}
export interface DictItem {
	/**
	 * 英文code
	 */
	code: string;
	/**
	 * 中文汉字
	 */
	name: string;
}
