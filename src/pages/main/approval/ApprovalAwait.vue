<template>
	<div class="tabber-pannel approval-await">
		<ApprovalMultipleTitle
			v-if="unApprovalList.length"
			v-model="multiple"
			:count="checkedIds.length"
			@update:model-value="onMultipleChange"
		/>

		<van-empty v-else description="暂无数据" />

		<van-checkbox-group v-model="checkedIds">
			<div
				v-for="item of unApprovalList"
				:key="item.id"
				class="approval-item-container"
			>
				<van-checkbox v-if="multiple" :name="item.id"></van-checkbox>
				<ApprovalAwaitItem
					:multiple="multiple"
					:item="item"
					@submit="onSubmit"
				/>
			</div>
		</van-checkbox-group>

		<!-- 底部全选 -->
		<ApprovalMultipleOperator
			v-if="multiple"
			:checked-all="checkedAll"
			@change="onCheckedAllChange"
			@submit-multiple="onSubmitMultiple"
		></ApprovalMultipleOperator>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import ApprovalAwaitItem from "./components/ApprovalAwaitItem.vue";
import ApprovalMultipleTitle from "./components/ApprovalMultipleTitle.vue";
import ApprovalMultipleOperator from "./components/ApprovalMultipleOperator.vue";
import { AppService } from "@/api/services/app.service";
import { AwaitApprovalItemInfo } from "@/types/approval.interface";
import { FilterService } from "@/utils/filter.service";
import { ApprovalStatus } from "@/types/state.type";

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
		checkedIds.value = unApprovalList.value.map((x) => x.id);
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
					const tempObj: AwaitApprovalItemInfo = {
						...item,
						id: `${userId}${code}${fromDate}`,
					};
					return tempObj;
				});
			},
		});
};
// 挂载前调用请求
onBeforeMount(() => {
	getUnApprovalList();
});
// 发送提交请求
const commit = (status: ApprovalStatus, list: AwaitApprovalItemInfo[]) => {
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
const onSubmit = (status: ApprovalStatus, id: string) => {
	const list = unApprovalList.value.find((item) => {
		return item.id === id;
	});
	if (list) {
		commit(status, [list]);
	}
};
/**	提交多个审批 */
const onSubmitMultiple = (status: ApprovalStatus) => {
	if (!checkedIds.value.length) return;
	const List = unApprovalList.value.filter((item) => {
		const flag = checkedIds.value.indexOf(item.id);
		return flag >= 0;
	});

	commit(status, List);
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
