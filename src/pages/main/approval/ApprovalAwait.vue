<template>
	<div class="tabber-pannel approval-await">
		<ApprovalMultipleTitle
			v-model="multiple"
			:count="checkedIds.length"
			@update:model-value="onMultipleChange"
		/>

		<van-checkbox-group v-model="checkedIds">
			<div
				v-for="item of unApprovalList"
				:key="item.code"
				class="approval-item-container"
			>
				<van-checkbox v-if="multiple" :name="item.code"></van-checkbox>
				<ApprovalAwaitItem
					:multiple="multiple"
					:item="item"
					@agree="agree"
					@refuse="refuse"
				/>
			</div>
		</van-checkbox-group>

		<!-- 底部全选 -->
		<ApprovalMultipleOperator
			v-if="multiple"
			:checked-all="checkedAll"
			@change="onCheckedAllChange"
		></ApprovalMultipleOperator>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import ApprovalAwaitItem from "./components/ApprovalAwaitItem.vue";
import ApprovalMultipleTitle from "./components/ApprovalMultipleTitle.vue";
import ApprovalMultipleOperator from "./components/ApprovalMultipleOperator.vue";
import { AppService } from "@/api/services/app.service";
import { ApprovalItemInfo } from "@/types/approval.interface";
import { FilterService } from "@/utils/filter.service";

const multiple = ref(false);
const checkedAll = computed(
	() =>
		unApprovalList.value.length > 0 &&
		checkedIds.value.length === unApprovalList.value.length
);

const checkedIds = ref<string[]>([]);

const onMultipleChange = (val: boolean) => {
	if (!val) checkedIds.value = [];
};

const onCheckedAllChange = (val: boolean) => {
	if (!val) {
		checkedIds.value = [];
	} else {
		unApprovalList.value.forEach((item) => {
			console.log(item.code);
			checkedIds.value.push(item.code);
		});
		// checkedIds.value = [...unApprovalList.value];
	}
};

// 测试数据const list = [
// 	{
// 		userName: "陈鹏杰123",
// 		userId: "f9c00116-5e16-4959-a298-9d0d58a886f3",
// 		projectName: "公司演示及生产服务器维护",
// 		code: "397",
// 		day: 4,
// 		amount: 767,
// 		fromDate: 1656604800000,
// 		approvalDate: 1659067034000,
// 	},
// 	{
// 		userName: "陈鹏杰123",
// 		userId: "f9c00116-5e16-4959-a298-9d0d58a886f3",
// 		projectName: "公司演示及生产服务器维护",
// 		code: "398",
// 		day: 4,
// 		amount: 545,
// 		fromDate: 1656604800000,
// 		approvalDate: 1659067034000,
// 	},
// 	{
// 		userName: "陈鹏杰123",
// 		userId: "f9c00116-5e16-4959-a298-9d0d58a886f3",
// 		projectName: "公司演示及生产服务器维护",
// 		code: "399",
// 		day: 4,
// 		amount: 455,
// 		fromDate: 1656604800000,
// 		approvalDate: 1659067034000,
// 	},
// 	{
// 		userName: "陈鹏杰123",
// 		userId: "f9c00116-5e16-4959-a298-9d0d58a886f3",
// 		projectName: "公司演示及生产服务器维护",
// 		code: "400",
// 		day: 4,
// 		amount: 898,
// 		fromDate: 1656604800000,
// 		approvalDate: 1659067034000,
// 	},
// ];
// 请求未审批数据
const unApprovalList = ref<ApprovalItemInfo[]>([]);
new AppService()
	.getApproval({ status: 2, startIndex: 0, pageSize: 0 })
	.subscribe({
		next: (data) => {
			unApprovalList.value = data.rows;
			// unApprovalList.value = list;
		},
	});
/**	提交单独审批 */
const agree = (code: string) => {
	console.log("agree", code);
	// 拼接同意审批列表
	// 筛选点击审批项目
	const [agreeItem] = unApprovalList.value.filter((item, index) => {
		return item.code === code;
	});
	const peroId = new FilterService().dateFormat(agreeItem.fromDate);

	const obj = {
		status: 1, //--1 同意申请 2 拒绝申请
		applies: [
			{
				// -- 审批列表集合
				peroId, // --提交审批的时间
				code: agreeItem.code, //--项目code
				userId: agreeItem.userId, //用户id
			},
		],
	};
	new AppService().submitApproval(obj).subscribe({
		next: (data) => {
			console.log("同意提交成功");
		},
	});
};
/**	提交拒绝审批 */
const refuse = (code: string) => {
	// 拼接拒绝审批列表
	// 筛选点击审批项目
	const [agreeItem] = unApprovalList.value.filter((item, index) => {
		return item.code === code;
	});

	const peroId = new FilterService().dateFormat(agreeItem.fromDate);

	const obj = {
		status: 2, //--1 同意申请 2 拒绝申请
		applies: [
			{
				// -- 审批列表集合
				peroId, // --提交审批的时间
				code: agreeItem.code, //--项目code
				userId: agreeItem.userId, //用户id
			},
		],
	};
	new AppService().submitApproval(obj).subscribe({
		next: (data) => {
			console.log("拒绝提交成功");
		},
	});
};
</script>

<style lang="less" scoped>
.tabber-pannel.approval-await {
	// top action
	.approval-multiple-title {
		position: sticky;
		top: 0;
		z-index: 1;
	}
	.approval-item-container {
		margin: 10px;
		display: flex;
		background-color: #fff;
		align-items: flex-start;
		border-radius: 4px;
		.van-checkbox {
			padding: 12px 0px 0 6px;
		}
		.approval-item {
			flex: 1;
		}
	}

	// bottom actions
	.approval-multiple-operator {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
	}
}
</style>
