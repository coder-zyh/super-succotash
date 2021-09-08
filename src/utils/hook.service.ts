import { DictService } from "./dict.service";
import { ref } from "vue";
import { FilterService } from "./filter.service";

//#region 字典服务

const dictService = ref<DictService>();

/**
 * 使用字典服务
 * @returns DictService
 */
export function useDict(): DictService {
	if (!dictService.value) {
		dictService.value = new DictService();
	}
	if (!dictService.value) {
		throw Error("dict service init error");
	}
	return dictService.value;
}

//#endregion

//#region  过滤器服务
const filterService = ref<FilterService>();

/**
 * 使用过滤器服务
 * @returns 过滤器服务
 */
export function useFilter(): FilterService {
	if (!filterService.value) {
		filterService.value = new FilterService();
	}
	if (!filterService.value) {
		throw Error("filter service init error");
	}
	return filterService.value;
}
