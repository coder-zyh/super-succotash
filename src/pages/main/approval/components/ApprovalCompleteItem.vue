<template>
	<div class="component approval-complete-item">
		<div class="approval-complete-item_content">
			<div class="approval-complete-item_title">{{ title }}</div>
			<div class="approval-complete-item_info">
				<span class="approval-complete-item_info__label">项目名称：</span>
				{{ value.projectName }}
			</div>
			<div class="approval-complete-item_info">
				<span class="approval-complete-item_info__label">工时：</span>
				{{ value.day }}
			</div>
			<div class="approval-complete-item_info">
				<span class="approval-complete-item_info__label">预估费用：</span>
				{{ value.amount ? 99 : 0 }}
			</div>
			<div class="approval-complete-item_info">
				<span class="approval-complete-item_info__label">审批时间：</span>
				{{ approval }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { FilterService } from "@/utils/filter.service";
import { computed, toRef } from "vue";

const props = defineProps({
	item: {
		type: Object,
		default() {
			return {};
		},
	},
});
const value = toRef(props, "item");
const title = computed(() => {
	const time = new Date(value.value.fromDate);
	const month = time.getMonth() + 1;
	const date = time.getDate();
	const showTime = month + "月" + date + "日";

	return value.value.userName + " 提交" + showTime + "报工";
});
const approval = new FilterService().dateFormat(value.value.approvalDate);
</script>
<style lang="less" scoped>
.component.approval-complete-item {
	.approval-complete-item {
		&_content {
			font-size: 13px;
			padding: 8px 12px;
		}
		&_title {
			font-size: 17px;
			margin-bottom: 4px;
		}
		&_info {
			margin-top: 2px;
			&__label {
				color: #999;
				display: inline-block;
				width: 70px;
			}
		}
	}
}
</style>
