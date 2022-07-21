<template>
	<div class="fee">
		<head-top>报销</head-top>
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list
				v-model:loading="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<fee-item v-for="item in feeList" :key="item" :item="item" />
			</van-list>
		</van-pull-refresh>
		<van-button type="primary" round size="large" class="btn" to="/fill">
			报销填报
		</van-button>
	</div>
</template>
<script>
import HeadTop from "@/components/HeadTop.vue";
import FeeItem from "./children/FeeItem.vue";
import { ref } from "vue";

export default {
	name: "Fee",
	components: { HeadTop, FeeItem },
	setup() {
		const loading = ref(false);
		const finished = ref(false);
		const onLoad = () => {
			getData();
		};
		// 数据
		const feeList = ref([]);
		// 获取数据
		const getData = () => {
			console.log("666");
			// 异步更新数据
			// setTimeout 仅做示例，真实场景中一般为 ajax 请求
			setTimeout(() => {
				// 加载状态结束
				loading.value = false;
				feeList.value.push(
					{
						code: "001016",
						name: "Project1",
						date: "2020-10-16",
						feeType: "差旅报销",
						money: "999",
					}
					// {
					// 	id: "0002",
					// 	code: "001017",
					// 	name: "Project2",
					// 	date: "2020-10-17",
					// 	feeType: "日常报销-其他",
					// 	money: "999",
					// }
				);
				// 数据全部加载完成
				if (list.value.length >= 40) {
					finished.value = true;
				}
			}, 2000);
		};
		return {
			feeList,
			getData,
			loading,
			finished,
			onLoad,
		};
	},
};
</script>
<style scoped>
.btn {
	position: fixed;
	bottom: 50px;
}
.load {
	margin-bottom: 100px;
}
</style>
