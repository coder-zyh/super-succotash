<template>
	<div class="page approval">
		<van-tabs v-model:active="active">
			<van-tab title="待审批">
				<ApprovalAwait />
			</van-tab>
			<van-tab title="已审批">内容 2</van-tab>
		</van-tabs>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import ApprovalAwait from "./ApprovalAwait.vue";

const active = ref(0);
</script>

<style lang="less" scoped>
.page.approval {
	height: calc(100vh - var(--van-tabbar-height));
	overflow: hidden;
	.van-tabs {
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
		:deep(.van-tabs__content) {
			flex: 1;
			overflow: auto;
		}
	}
}
</style>
