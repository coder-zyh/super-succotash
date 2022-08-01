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
				<van-checkbox v-if="multiple" :name="item.id"></van-checkbox>
				<ApprovalAwaitItem :multiple="multiple" :item="item" @submit="submit" />
			</div>
		</van-checkbox-group>

		<!-- 底部全选 -->
		<ApprovalMultipleOperator
			v-if="multiple"
			:checked-all="checkedAll"
			@change="onCheckedAllChange"
			@submit-multiple="submitMultiple"
		></ApprovalMultipleOperator>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import ApprovalAwaitItem from "./components/ApprovalAwaitItem.vue";
import ApprovalMultipleTitle from "./components/ApprovalMultipleTitle.vue";
import ApprovalMultipleOperator from "./components/ApprovalMultipleOperator.vue";
import { AppService } from "@/api/services/app.service";
import { AwaitApprovalItemInfo } from "@/types/approval.interface";
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
			checkedIds.value.push(item.id);
		});
		// checkedIds.value = [...unApprovalList.value];
	}
};
// 请求未审批数据
const unApprovalList = ref<AwaitApprovalItemInfo[]>([]);
const getUnApprovalList = () => {
	new AppService()
		.getApproval({
			status: 2 /*startIndex: 0, pageSize: 0  后端暂时无法处理分页*/,
		})
		.subscribe({
			next: (data) => {
				unApprovalList.value = data.rows.map((item) => {
					const { userId, code, fromDate } = item;
					const tempList: AwaitApprovalItemInfo = {
						...item,
						id: `${userId}${code}${fromDate}`,
					};
					return tempList;
				});
			},
		});
};
getUnApprovalList();
// 发送提交请求
const commit = (status: 1 | 2, list: Array<AwaitApprovalItemInfo>) => {
	const applies = list.map((item) => {
		const { code, userId, fromDate } = item;
		const peroId = new FilterService().dateFormat(fromDate);
		const numCode = Number(code);

		const obj = {
			peroId,
			code: numCode,
			userId,
		};
		return obj;
	});
	// 拼接请求体
	const obj = {
		status, //--1 同意申请 2 拒绝申请
		applies,
	};

	new AppService().submitApproval(obj).subscribe({
		next: (data) => {
			getUnApprovalList();
		},
	});
};
/**	提交单个审批 */
const submit = (status: 1 | 2, id: string) => {
	const list = unApprovalList.value.filter((item) => {
		return item.id === id;
	});

	commit(status, list);
};
/**	提交多个审批 */
const submitMultiple = (status: 1 | 2) => {
	const agreeList = unApprovalList.value.filter((item) => {
		const flag = checkedIds.value.indexOf(item.id);
		return flag >= 0;
	});

	commit(status, agreeList);
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
