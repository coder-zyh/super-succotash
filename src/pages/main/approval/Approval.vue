<template>
	<div class="approval">
		<head-top>审批</head-top>
		<van-tabs v-model:active="active">
			<van-tab title="待审批">内容 1</van-tab>
			<van-tab title="已审批">内容 2</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import HeadTop from "@/components/HeadTop.vue";

export default {
	name: "Approval",
	components: { HeadTop },
};
</script>
