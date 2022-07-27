<template>
	<div class="component approval-multiple-title">
		<van-cell
			:class="{ 'multiple-checked': hasChecked }"
			:title="titleText"
			:icon="iconName"
			clickable
			@click="onMultipleClick"
		>
			<template #right-icon>
				<van-button
					v-show="modelValue"
					type="danger"
					size="mini"
					@click.stop="onMultipleCancel"
				>
					取消
				</van-button>
			</template>
		</van-cell>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	count: Number,
});

const iconName = computed(() => (props.modelValue ? "bars" : ""));

const emits = defineEmits(["update:modelValue"]);

const onMultipleClick = () => {
	emits("update:modelValue", true);
};

const onMultipleCancel = () => {
	emits("update:modelValue", false);
};

const titleText = computed(() => {
	if (!props.count) {
		return "选择多个";
	} else {
		return `选择了${props.count}个`;
	}
});

const hasChecked = computed(() => props.count && props.count > 0);
</script>

<style lang="less" scoped>
.component.approval-multiple-title {
	background-color: #fff;
	.multiple-checked {
		:deep(.van-cell__left-icon) {
			color: var(--van-blue);
		}
	}
}
</style>
