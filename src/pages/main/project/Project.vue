<template>
	<div class="project">
		<head-top>项目</head-top>
		<project-item v-model:title="name"></project-item>
	</div>
</template>
<script setup>
import HeadTop from "@/components/HeadTop.vue";
import { ref } from "vue";
import ProjectItem from "./children/ProjectItem.vue";
const name = ref("zyh");
</script>
