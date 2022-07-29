<template>
	<div class="tabber-pannel approval-complete">
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list
				v-model:loading="loading"
				:finished="finished"
				finished-text="没有更多了"
				offset="10"
				:immediate-check="false"
				@load="onLoad"
			>
				<div
					v-for="item in approvalList"
					:key="item.code"
					class="approval-item-container"
				>
					<ApprovalCompleteItem :item="item"></ApprovalCompleteItem>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script lang="ts" setup>
import { AppService } from "@/api/services/app.service";
import { ApprovalItemInfo } from "@/types/approval.interface";
import { reactive, ref, toRef } from "vue";
import ApprovalCompleteItem from "./components/ApprovalCompleteItem.vue";
// 请求数据
const pageIndex = ref(1);
const approvalList = ref<ApprovalItemInfo[]>([]);
// 参数
const param = reactive({
	status: 1,
	startIndex: pageIndex,
	pageSize: 5,
});
const total = ref(10);
//测试数据
// const list = [
// 	{
// 		userName: "陈鹏杰123",
// 		userId: "f9c00116-5e16-4959-a298-9d0d58a886f3",
// 		projectName: "贷后催收系统售后运维",
// 		code: "398",
// 		day: 4,
// 		amount: 300,
// 		fromDate: 1656604800000,
// 		approvalDate: 1659065911000,
// 	},
// 	{
// 		userName: "陈鹏杰123",
// 		userId: "f9c00116-5e16-4959-a298-9d0d58a886f3",
// 		projectName: "贷后催收系统售后运维",
// 		code: "398",
// 		day: 4,
// 		amount: 300,
// 		fromDate: 1656604800000,
// 		approvalDate: 1659065911000,
// 	},
// 	{
// 		userName: "陈鹏杰123",
// 		userId: "f9c00116-5e16-4959-a298-9d0d58a886f3",
// 		projectName: "贷后催收系统售后运维",
// 		code: "398",
// 		day: 4,
// 		amount: 300,
// 		fromDate: 1656604800000,
// 		approvalDate: 1659065911000,
// 	},
// 	{
// 		userName: "陈鹏杰123",
// 		userId: "f9c00116-5e16-4959-a298-9d0d58a886f3",
// 		projectName: "贷后催收系统售后运维",
// 		code: "398",
// 		day: 4,
// 		amount: 300,
// 		fromDate: 1656604800000,
// 		approvalDate: 1659065911000,
// 	},
// 	{
// 		userName: "陈鹏杰123",
// 		userId: "f9c00116-5e16-4959-a298-9d0d58a886f3",
// 		projectName: "贷后催收系统售后运维",
// 		code: "398",
// 		day: 4,
// 		amount: 300,
// 		fromDate: 1656604800000,
// 		approvalDate: 1659065911000,
// 	},
// ];
const getApprovalList = () => {
	new AppService().getApproval(param).subscribe({
		next: (data) => {
			approvalList.value.push(...data.rows);
			// 后端返回列表长度
			data.total ? (total.value = data.total) : 0;
			// total.value = 10;
			// approvalList.value.push(...list);
			// 加载结束
			loading.value = false;
			refreshing.value = false;

			pageIndex.value++;
		},
	});
};
// 默认加载一次;
getApprovalList();
// 下拉刷新
const refreshing = ref(false);
const onRefresh = () => {
	refreshing.value = true;
	finished.value = false;
	// 清空数据
	approvalList.value = [];
	pageIndex.value = 1;
	onLoad();
};
// 上拉加载
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
	loading.value = true;
	if (approvalList.value.length < total.value) {
		getApprovalList();
	} else {
		finished.value = true;
	}
};
</script>

<style lang="less" scoped>
.tabber-pannel.approval-complete {
	.approval-item-container {
		margin: 10px;
		display: flex;
		background-color: #fff;
		align-items: flex-start;
		border-radius: 4px;
		.approval-item {
			flex: 1;
		}
	}
}
</style>
