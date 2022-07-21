<template>
	<div class="page index">
		<keep-alive>
			<router-view />
		</keep-alive>
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
	created() {
		this.getProjectList();
	},
	methods: {
		// 获取关联项目列表

		getProjectList() {
			const arr = [
				"project1-001016",
				"project2-001017",
				"project3-001018",
				"project4-001015",
				"project5-001019",
				"project6-001012",
			];
			localStorage.setItem("projectList", JSON.stringify(arr));
			console.log(localStorage.getItem("projectList"));
		},
	},
});
</script>
<style lang="less" scoped>
.page.index {
	margin: 50px 0;
	background-color: #f2f2f2;
}
</style>

function projectList(projectList: any, arg1: string[]) { throw new
Error("Function not implemented."); } function projectList(projectList: any,
arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, arg6:
string, arg7: string, arg8: string) { throw new Error("Function not
implemented."); }
