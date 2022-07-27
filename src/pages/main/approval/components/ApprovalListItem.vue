<template>
	<div class="approvalItem">
		<van-cell-group v-if="value" inset>
			<van-cell :title="title" size="large" />
			<van-cell title="项目名称" :value="value.projectName" center />
			<van-cell title="工时" :value="value.day" center />
			<van-cell title="预估费用" :value="value.amount ? 99 : 0" center />
			<van-cell title="审批时间" :value="date" />
		</van-cell-group>
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
	return value.value.userName + " 提交报工";
});
const date = new FilterService().dateFormat(value.value.fromDate);
</script>
<style lang="less" scoped>
.approvalItem {
	padding: 5px 0;
}
</style>
