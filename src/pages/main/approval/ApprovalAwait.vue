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
					:un-approval-list="item"
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
// 请求未审批数据
const unApprovalList = ref<ApprovalItemInfo[]>([]);
new AppService()
	.getApproval({ status: 2, startIndex: 1, pageSize: 0 })
	.subscribe({
		next: (data) => {
			console.log(data);

			unApprovalList.value = data.rows;
		},
	});
/**	提交审批 */
const agree = () => {
	console.log("agree");
	// 拼接同意审批列表

	const applies = [
		{
			peroId: "2022-08-23",
			code: 397,
		},
	];
	new AppService().submitApproval({ status: 1, applies }).subscribe({
		next: (data) => {
			console.log(data);
		},
	});
};
/**	拒绝审批 */
const refuse = () => {
	console.log("refuse");
	// 拼接拒绝审批列表
	const applies = [
		{
			peroId: "2022-08-23",
			code: 397,
		},
	];
	new AppService().submitApproval({ status: 2, applies }).subscribe({
		next: (data) => {
			console.log(data);
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
