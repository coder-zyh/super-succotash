<template>
	<div class="page index">
		<router-view />
		<van-tabbar route>
			<van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item replace to="/overdue" icon="user-o">
				逾期任务
			</van-tabbar-item>
			<van-tabbar-item replace to="/risk" icon="home-o">
				风险任务
			</van-tabbar-item>
			<!-- <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item> -->
		</van-tabbar>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "MainLayout",
});
</script>
