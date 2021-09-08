import { store } from "@/store";
import { DictItem } from "@/types/dict.interface";

export class DictService {
	/**
	 * 获取字典数据
	 * @param codes
	 */
	getDictData(...keys: string[]): DictItem[] {
		const results: DictItem[] = [];
		// 获取字典项
		keys.forEach((key) => {
			const items = store.state.dict[key];
			if (items && items.length) {
				results.push(...items);
			}
		});
		return results;
	}

	/**
	 * 过滤器：获取字典名称
	 * @param code 字典键值
	 */
	getDictName(code: string, key: string) {
		let result = "";
		if (code && key) {
			const values = store.state.dict[key];
			if (!values) return key;
			const find = values.find((x) => x.code === code);
			if (find) result = find.name;
		}
		return result;
	}

	/**
	 * 根据字典值和分类获取字典的键名称
	 * @param value 字典值
	 * @param key 字典分类
	 */
	getDictKeyStr(value?: string, key?: string) {
		let result = "";
		if (value && key) {
			const values = store.state.dict[key];
			const find = values.find((x) => x.code === value);
			if (find) result = find.code;
		}
		return result;
	}
}
