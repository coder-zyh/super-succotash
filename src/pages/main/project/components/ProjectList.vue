<template>
	<div class="project project-list">
		<van-pull-refresh
			v-model="isRefreshing"
			success-text="刷新成功"
			@refresh="onRefresh"
		>
			<div v-for="item of props.projectList" :key="item.code">
				<ProjectListItem :item="item"></ProjectListItem>
			</div>
		</van-pull-refresh>
	</div>
</template>
<script setup lang="ts">
import { ProjectItemInfo } from "@/types/project.interface";
import ProjectListItem from "./ProjectListItem.vue";
import { defineEmits, ref, toRef } from "vue";
const props = defineProps({
	projectList: Array<ProjectItemInfo>,
	current: Boolean,
});
const isRefreshing = toRef(props, "current");
isRefreshing.value = true;
const emits = defineEmits(["refresh"]);
const onRefresh = () => {
	emits("refresh");
};
</script>
