<template>
	<div class="tabber-pannel approval-await">
		<ApprovalMultipleTitle
			v-model="multiple"
			:count="checkedIds.length"
			@update:model-value="onMultipleChange"
		/>

		<van-checkbox-group v-model="checkedIds">
			<div v-for="item of list" :key="item" class="approval-item-container">
				<van-checkbox v-if="multiple" :name="item"></van-checkbox>
				<ApprovalItem :multiple="multiple" />
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
import ApprovalItem from "./components/ApprovalItem.vue";
import ApprovalMultipleTitle from "./components/ApprovalMultipleTitle.vue";
import ApprovalMultipleOperator from "./components/ApprovalMultipleOperator.vue";

const multiple = ref(false);
const checkedAll = computed(
	() => list.value.length > 0 && checkedIds.value.length === list.value.length
);

const checkedIds = ref<string[]>([]);

const onMultipleChange = (val: boolean) => {
	if (!val) checkedIds.value = [];
};

const list = ref(["1", "2", "3", "4", "5", "6"]);

const onCheckedAllChange = (val: boolean) => {
	if (!val) {
		checkedIds.value = [];
	} else {
		checkedIds.value = [...list.value];
	}
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
