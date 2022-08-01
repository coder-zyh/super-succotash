<template>
	<van-cell center class="component approval-multiple-operator">
		<template #title>
			<van-checkbox v-model="checkBoxModel">全选</van-checkbox>
		</template>
		<div>
			<van-button
				class="operator_button operator_button-refuse"
				@click="$emit('submitMultiple', 2)"
			>
				拒绝
			</van-button>
			<van-button
				class="operator_button operator_button-agree"
				type="primary"
				@click="$emit('submitMultiple', 1)"
			>
				同意
			</van-button>
		</div>
	</van-cell>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps({
	checkedAll: Boolean,
});

const checkBoxModel = computed({
	get: () => props.checkedAll,
	set: (val) => emits("change", val),
});

const emits = defineEmits(["submitMultiple", "change"]);
</script>

<style lang="less" scoped>
.component.approval-multiple-operator {
	.operator {
		&_button {
			height: 30px;
			&-agree {
				margin-left: 10px;
			}
		}
	}
}
</style>
