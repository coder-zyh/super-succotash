<template>
	<van-picker
		class="component project-picker"
		title="项目选择"
		:columns="columns"
		@cancel="onCancel"
		@confirm="onConfirm"
	></van-picker>
</template>

<script lang="ts" setup>
import { AppService } from "@/api/services/app.service";
import { ref } from "vue";

const columns = ref([]);

new AppService().getProjectList().subscribe({
	next: (data: any[]) => {
		columns.value = data.map((x) => ({
			text: `${x.code}-${x.name}`,
			value: x.id,
		}));
	},
});

const emits = defineEmits(["cancel", "confirm"]);
const onCancel = () => emits("cancel");

const onConfirm = (param: PickerResult) => emits("confirm", param);
</script>

<style lang="less" scoped></style>
