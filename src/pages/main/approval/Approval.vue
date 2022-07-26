<template>
	<div class="page_content approval">
		<zw-nav-bar hidden-left title="审批"></zw-nav-bar>
		<van-tabs v-model:active="active">
			<van-tab title="待审批">内容 1</van-tab>
			<van-tab title="已审批">内容 2</van-tab>
		</van-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Approval",
	data() {
		return {
			active: "",
		};
	},
});
</script>
