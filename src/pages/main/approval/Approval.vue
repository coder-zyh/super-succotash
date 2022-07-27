<template>
	<div class="page approval">
		<van-tabs v-model:active="active">
			<van-tab title="待审批">内容 1</van-tab>
			<van-tab title="已审批">内容 2</van-tab>
		</van-tabs>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const active = ref(0);
</script>
