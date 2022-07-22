<template>
	<van-form input-align="right" class="component report-item">
		<van-field
			label="项目名称"
			:model-value="name"
			placeholder="项目名称"
			is-link
			readonly
			@click="selectProject"
		/>
		<van-field
			v-model="timeModel"
			placeholder="请输入项目工时"
			label="项目工时"
			type="digit"
		/>
		<van-field
			label="预估费用合计"
			:model-value="totalAmtStr"
			is-link
			readonly
			placeholder="自动计算"
			@click="inputFeeitems"
		/>
	</van-form>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const emits = defineEmits(["click", "update:timeCount"]);
const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	name: String,
	timeCount: Number,
	totalAmount: {
		type: Number,
		required: false,
	},
});

const totalAmtStr = computed(() => `${props.totalAmount || ""}`);

const timeModel = computed({
	get: () => (props.timeCount || "").toString(),
	set: (val) => emits("update:timeCount", Number.parseFloat(val)),
});

const inputFeeitems = () => emits("click", "fee", props.id);
const selectProject = () => emits("click", "project", props.id);
</script>
