<template>
	<div class="page_content fee">
		<zw-nav-bar hidden-left title="报销"></zw-nav-bar>
		<van-pull-refresh
			v-model="refreshing"
			success-text="刷新成功"
			@refresh="onRefresh"
		>
			<van-list
				v-model:loading="loading"
				:finished="finished"
				finished-text="没有更多了"
				:immediate-check="false"
				class="load"
				offset="-140"
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
<script lang="ts">
import FeeItem from "./children/FeeItem.vue";
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
	name: "Fee",
	components: { FeeItem },
	setup() {
		// 数据
		const feeList = ref<any[]>([]);
		// 请求页码参数
		const pageIndex = ref(1);
		// 控制下拉刷新
		const refreshing = ref(false);
		const onRefresh = () => {
			// 刷新清空页面;
			feeList.value = [];
			// 页码清零
			pageIndex.value = 1;
			// 未结束
			finished.value = false;
			// 触发加载函数
			console.log("ref-------------------");
			onLoad();
		};
		// 控制加载数据
		const loading = ref(false);
		const finished = ref(false);
		const onLoad = () => {
			// 出发请求数据函数
			loading.value = true;
			console.log("load------------------");
			getData(pageIndex);
		};

		// 获取数据
		const getData = (pageIndex: Ref<number>) => {
			console.log("get------------------");
			console.log(pageIndex.value);
			// 异步更新数据
			// setTimeout 仅做示例，真实场景中一般为 ajax 请求
			new Promise((resolve, reject) => {
				setTimeout(() => {
					feeList.value.push(
						{
							id: "0001",
							code: "001016",
							name: pageIndex.value,
							date: "2020-10-16",
							feeType: "差旅报销",
							money: "999",
						},
						{
							id: "0002",
							code: "001017",
							name: "Project2",
							date: "2020-10-17",
							feeType: "日常报销-其他",
							money: "999",
						}
					);

					resolve("success");
				}, 1000);
			})
				.then((value) => {
					console.log(value);
					// 加载状态结束
					loading.value = false;
					refreshing.value = false;
					// 数据全部加载完成
					if (pageIndex.value > 2) {
						// 判断条件结束加载更多
						finished.value = true;
					}
					pageIndex.value++;
				})
				.catch((err) => {
					throw err;
				})
				.finally(() => {
					console.log("finish");
				});
		};
		return {
			feeList,
			refreshing,
			getData,
			loading,
			finished,
			onLoad,
			onRefresh,
		};
	},
	// created() {
	// 	this.onLoad(this.pageIndex);
	// },
});
</script>
<style scoped>
.btn {
	position: fixed;
	bottom: 50px;
}
.load {
	margin-bottom: 100px;
	min-height: 85vh;
}
</style>
