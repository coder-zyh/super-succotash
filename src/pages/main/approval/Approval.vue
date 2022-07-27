<template>
	<div class="page_content approval">
		<zw-nav-bar hidden-left title="审批"></zw-nav-bar>

		<van-tabs v-model:active="active" sticky offset-top="46">
			<van-tab title="待审批"></van-tab>
			<van-tab title="已审批">
				<approval-list-item
					v-for="item in approvalList"
					:key="item.code"
					:item="item"
				></approval-list-item>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script lang="ts" setup>
import { AppService } from "@/api/services/app.service";
import { ApprovalItem } from "@/types/approval.interface";
import ApprovalListItem from "./components/ApprovalListItem.vue";
import { ref } from "vue";
const active = ref(0);
const approvalList = ref<ApprovalItem[]>([]);
// const unApprovalList = ref<ApprovalItem[]>([]);//未审批列表
// 请求已审批列表
new AppService().getApproval().subscribe({
	next: (data) => {
		approvalList.value = data;
	},
});
</script>
