<template>
	<div class="approvalItem">
		<van-cell-group inset>
			<van-cell :title="title" size="large" />
			<van-cell title="项目名称" :value="props.item.projectName" center />
			<van-cell title="工时" :value="props.item.day" center />
			<van-cell title="预估费用" :value="props.item.amount ? 99 : 0" center />
			<van-cell title="审批时间" :value="date" />
		</van-cell-group>
	</div>
</template>
<script lang="ts" setup>
import { FilterService } from "@/utils/filter.service";
import { computed, toRef } from "vue";

const props = defineProps({
	item: Object,
});
const title = computed(() => {
	return props.item.userName + " 提交报工";
});
const date = new FilterService().dateFormat(props.item.fromDate);
console.log(date);
</script>
<style lang="less" scoped>
.approvalItem {
	padding: 5px 0;
}
</style>
