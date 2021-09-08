import { PropType, Prop } from "vue";

export const StringMust = {
	type: String,
	required: true,
	default: "0.00",
};

/**
 * 案件类型定义
 */
export const CaseType: Prop<TaskType> = {
	type: String as PropType<TaskType>,
	default: "overdue",
	required: true,
};
