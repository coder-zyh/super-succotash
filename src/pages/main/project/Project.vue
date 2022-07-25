<template>
	<div class="project">
		<van-nav-bar title="项目" fixed placeholder z-index="9" />
		<project-item v-model:title="name"></project-item>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ProjectItem from "./children/ProjectItem.vue";
const name = ref("zyh");
</script>
