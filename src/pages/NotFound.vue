<template>
	<div
		class="
			page
			full
			not-found
			flex-column
			justify-content-center
			align-items-center
		"
	>
		<van-empty class="flex-auto" description="很遗憾，页面未找到"></van-empty>
		<van-button
			block
			type="primary"
			icon="wap-home"
			text="返回首页"
			to="/"
		></van-button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	name: "NotFound",
});
</script>

<style lang="less" scoped></style>
