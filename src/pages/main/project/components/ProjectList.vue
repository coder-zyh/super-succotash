<template>
	<div class="project project-list">
		<van-pull-refresh>
			<div
				v-for="item of props.projectList"
				:key="item.id"
				class="project_item"
			>
				<ProjectListItem :item="item"></ProjectListItem>
			</div>
		</van-pull-refresh>
	</div>
</template>
<script setup lang="ts">
import { ProjectItemInfo } from "@/types/project.interface";
import ProjectListItem from "./ProjectListItem.vue";
import { defineProps } from "vue";
const props = defineProps({
	projectList: Array<ProjectItemInfo>,
});
console.log(props.projectList);
</script>
