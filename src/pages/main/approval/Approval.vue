<template>
	<div class="page approval">
		<van-tabs v-model:active="active" color="#1989fa">
			<van-tab title="待审批">
				<ApprovalAwait />
			</van-tab>
			<van-tab title="已审批">
				<ApprovalComplete />
			</van-tab>
		</van-tabs>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ApprovalAwait from "./ApprovalAwait.vue";
import ApprovalComplete from "./ApprovalComplete.vue";

const active = ref(0);
</script>

<style lang="less" scoped>
.page.approval {
	height: calc(100vh - var(--van-tabbar-height));
	color: #333;
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
