<template>
	<div class="component task-item flex">
		<div class="task-item__left flex-auto">
			<div>{{ data.name }}</div>
			<div>任务类型：{{ data.type }}</div>
		</div>
		<div class="task-item__right" @click="onItemClick">
			<van-icon name="arrow" size="18" />
		</div>
	</div>
</template>

<script lang="ts">
import { CaseBaseInfo } from "@/types/case.interface";
import { defineComponent, PropType } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "CaseItem",
	props: {
		data: {
			type: Object as PropType<CaseBaseInfo>,
			required: true,
		},
	},
	setup(props) {
		const router = useRouter();
		function onItemClick() {
			router.push({
				name: "detail",
				params: { caseId: props.data.id },
			});
		}

		return {
			onItemClick,
		};
	},
});
</script>

<style lang="less" scoped></style>
