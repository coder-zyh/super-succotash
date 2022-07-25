<template>
	<div class="approval">
		<van-nav-bar title="审批" fixed placeholder z-index="9" />
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
