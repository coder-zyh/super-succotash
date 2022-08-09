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
import { MyteProjectInfo } from "@/types/project.interface";
import { computed, ref } from "vue";

// const columns = ref([]);

const resource = ref<MyteProjectInfo[]>([]);

const columns = computed(() =>
	resource.value.map((x) => ({
		text: `${x.code}-${x.name}`,
		value: x.id,
		disabled: false,
	}))
);

new AppService().getProjectList().subscribe({
	next: (data: any[]) => {
		resource.value = data;
	},
});

const emits = defineEmits(["cancel", "confirm"]);
const onCancel = () => emits("cancel");

const onConfirm = (param: PickerResult) => {
	const item = resource.value.find((x) => x.id === param.value);
	if (!item) {
		emits("confirm", { text: "", value: "" });
		console.error("数据发生错误");
	} else {
		// param.disabled = true;暂时存在bug，不启用该功能
		emits("confirm", {
			text: item.name,
			value: item.id,
		});
	}
};
</script>

<style lang="less" scoped></style>
