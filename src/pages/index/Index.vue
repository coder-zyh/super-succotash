<template>
	<div class="page index">
		<router-view class="index-container" />
		<van-tabbar route>
			<van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item replace to="/overdue" icon="failure">
				逾期任务
			</van-tabbar-item>
			<van-tabbar-item replace to="/risk" icon="tosend">
				风险任务
			</van-tabbar-item>
			<!-- <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item> -->
		</van-tabbar>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
	name: "Index",
});
</script>

<style lang="less" scoped>
.page.index {
	margin-bottom: 50px;
}
</style>
