<template>
	<div class="page index">
		<router-view v-slot="{ Component }" class="index-container">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view>
		<van-tabbar route>
			<van-tabbar-item replace to="/report" icon="home-o">报工</van-tabbar-item>
			<van-tabbar-item replace to="/fee" icon="failure">报销</van-tabbar-item>
			<van-tabbar-item replace to="/approval" icon="tosend">
				审批
			</van-tabbar-item>
			<van-tabbar-item replace to="/project" icon="friends-o">
				项目
			</van-tabbar-item>
			<van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
	name: "Index",
	setup() {
		const arr = [
			"project1-001016",
			"project2-001017",
			"project3-001018",
			"project4-001015",
			"project5-001019",
			"project6-001012",
		];
		localStorage.setItem("projectList", JSON.stringify(arr));
	},
});
</script>
<style lang="less" scoped>
.page.index {
	background-color: #f2f2f2;
	.index-container {
		margin-bottom: var(--van-tabbar-height);
	}
}
</style>
