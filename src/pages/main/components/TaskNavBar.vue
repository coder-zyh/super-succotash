<template>
	<van-nav-bar class="component task-nav-bar" fixed :title="titleText">
		<template #left>
			<van-icon name="search " size="18" @click="onSearchClick" />
		</template>
		<template #right></template>
	</van-nav-bar>
</template>

<script lang="ts">
import { CaseType } from "@/utils/usePropType";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	name: "TaskNavBar",
	props: {
		title: String,
		departmentType: String,
		collectionStatus: String,
		taskState: String,
		showState: Boolean,
		type: CaseType,
	},
	computed: {
		titleText(): string {
			return this.title || "任务列表";
		},
	},
	methods: {
		onSearchClick() {
			// this.$router.push("/search/" + this.type);
			this.$router.push({
				path: `/search/${this.type}`,
				query: {
					departmentType: this.departmentType,
					collectionStatus: this.collectionStatus,
					showState: this.showState,
					taskState: this.taskState,
				},
			});
		},
	},
});
</script>

<style lang="less" scoped>
.task-nav-bar {
	background-color: #0062ad;
}
:deep(.van-icon) {
	color: #fefefe;
}
:deep(.van-nav-bar__title) {
	color: #fefefe;
}
:deep(.van-nav-bar__right) {
	.van-nav-bar__text {
		color: #fefefe;
	}
}
</style>
