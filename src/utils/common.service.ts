import cloneDeep from "lodash.clonedeep";

/**
 * 公共函数
 */
export class CommonService {
	/**
	 * 对象赋值
	 * @param target
	 * @param resource
	 */
	public static revertData(target: any, resource: any) {
		if (!target || !resource) return;
		Object.keys(target).forEach((key) => {
			const value = resource[key];
			if (!value) return;
			if (target[key] instanceof Array) {
				target[key] = [...value];
			}
			target[key] = value;
		});
	}
}
