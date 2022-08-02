<template>
	<div class="page_content project">
		<zw-nav-bar hidden-left title="项目"></zw-nav-bar>
		<!-- <van-dropdown-menu>
			<van-dropdown-item ref="item" title="项目选择"></van-dropdown-item>
			<van-dropdown-item title="时间选择">
				<van-calendar
					title=""
					:poppable="false"
					:show-confirm="false"
					:style="{ height: '500px' }"
					@confirm="changeDate"
				/>
			</van-dropdown-item>
		</van-dropdown-menu> -->
		<ProjectList :project-list="projectList"></ProjectList>
	</div>
</template>
<script lang="ts" setup>
import ProjectList from "./components/ProjectList.vue";
import { AppService } from "@/api/services/app.service.js";
import { ref } from "vue";
import { ProjectItemInfo } from "@/types/project.interface.js";

const getProjectList = () => {
	new AppService().getProjectList().subscribe({
		next: (data: any[]) => {
			console.log(data);
			projectList.value = data;
			// projectNameList.value = data.map((x) => {
			// 	return {
			// 		text: x.name,
			// 		value: x.id,
			// 	};
			// });
		},
	});
};
getProjectList();
const projectList = ref<ProjectItemInfo[]>([]);
</script>
