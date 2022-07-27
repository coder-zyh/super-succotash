<template>
	<div class="tabber-pannel approval-complete">
		<approval-list-item
			v-for="item in approvalList"
			:key="item.code"
			:item="item"
		></approval-list-item>
	</div>
</template>

<script lang="ts" setup>
import { AppService } from "@/api/services/app.service";
import { ApprovalItemInfo } from "@/types/approval.interface";
import { ref } from "vue";
import ApprovalListItem from "./components/ApprovalListItem.vue";

const approvalList = ref<ApprovalItemInfo[]>([]);
// const unApprovalList = ref<ApprovalItem[]>([]);//未审批列表
// 请求已审批列表
new AppService().getApproval().subscribe({
	next: (data) => {
		approvalList.value = data;
	},
});
</script>

<style lang="less" scoped></style>
