<template>
	<div class="page index">
		<router-view v-slot="{ Component }" class="index-container">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view>
		<van-tabbar route>
			<van-tabbar-item replace to="/index/report" icon="home-o">
				报工
			</van-tabbar-item>
			<!-- <van-tabbar-item v-if="isAdmin" replace to="/index/fee" icon="failure">
				报销
			</van-tabbar-item> -->
			<van-tabbar-item
				v-if="isAdmin"
				replace
				to="/index/approval"
				icon="tosend"
			>
				审批
			</van-tabbar-item>
			<van-tabbar-item
				v-if="isAdmin"
				replace
				to="/index/project"
				icon="friends-o"
			>
				项目
			</van-tabbar-item>
			<van-tabbar-item replace to="/index/my" icon="user-o">
				我的
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "vue";
const store = useStore();
const isAdmin = computed(() => store.state.user.isAdmin);
</script>
<style lang="less" scoped>
.page.index {
	background-color: #f2f2f2;
	.index-container {
		margin-bottom: var(--van-tabbar-height);
	}
}
</style>
