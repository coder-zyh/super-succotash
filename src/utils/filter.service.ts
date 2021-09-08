import { DictService } from "./dict.service";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

export class FilterService {
	private dictService = new DictService();

	/**
	 * 转换字典数据
	 * @param 字典code
	 */
	dictConvert(code?: string, key?: string) {
		if (!code || !key) {
			return "";
		}
		return this.dictService.getDictName(code, key);
	}

	/**
	 * 批量转换字典数据
	 */
	batchDictConvert(code?: string, key?: string) {
		if (!code || !key) {
			return "";
		}
		const codeList = code.split(",");
		return codeList.map((v) => this.dictConvert(v, key)).join(",");
	}

	/**
	 * 日期时间格式化
	 * @param date
	 * @param fmt 默认值为长日期格式
	 */
	dateTimeFormat(date?: dayjs.ConfigType, fmt = "YYYY-MM-DD HH:mm:ss"): string {
		return this.dateFormat(date, fmt);
	}

	/**
	 * 日期格式化
	 * @param date
	 * @param fmt 默认值为短日期格式
	 */
	dateFormat(date?: dayjs.ConfigType, fmt = "YYYY-MM-DD"): string {
		if (!date) return "";
		return dayjs(date).format(fmt);
	}

	/**
	 * 千分位转换
	 * @param value
	 */
	toThousands(value, fixed = 2): string {
		let num: any = "";
		if (value === null || value === "") {
			num = value;
		} else {
			num = Number(value).toFixed(fixed);
			if (isNaN(num) || num === "" || num === undefined || num === null) {
				return "";
			}
			num = num + "";
			if (/^.*\..*$/.test(num)) {
				const pointIndex = num.lastIndexOf(".");
				let intPart = num.substring(0, pointIndex);
				const pointPart = num.substring(pointIndex + 1, num.length);
				intPart = intPart + "";
				const re = /(-?\d+)(\d{3})/;
				while (re.test(intPart)) {
					intPart = intPart.replace(re, "$1,$2");
				}
				num = intPart + "." + pointPart;
			} else {
				num = num + "";
				const re = /(-?\d+)(\d{3})/;
				while (re.test(num)) {
					num = num.replace(re, "$1,$2");
				}
			}
		}
		return num;
	}
}
