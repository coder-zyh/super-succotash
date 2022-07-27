<template>
	<div class="fee">
		<van-nav-bar title="报销" fixed placeholder z-index="9" />
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
				@load="onLoad"
			>
				<fee-item v-for="item in feeList" :key="item.code" :item="item" />
				<div v-if="showMore" @click="loadMore">
					<van-divider>点击加载更多</van-divider>
				</div>
				<div v-else>
					<van-divider>无更多数据</van-divider>
				</div>
			</van-list>
		</van-pull-refresh>

		<div class="fee_bottom">
			<van-button type="primary" round block @click="fillForm">
				报销填报
			</van-button>
		</div>
	</div>
</template>
<script lang="ts">
import FeeItem from "./components/FeeItem.vue";
import { feeListItem } from "@/types/project.interface";
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "Fee",
	components: { FeeItem },
	setup() {
		// 费用列表
		const feeList = ref<feeListItem[]>([]);
		// 请求页码参数,页码总数
		const pageIndex = ref(1);
		// 控制加载更多显示
		const showMore = ref(true);

		const loading = ref(false);
		const finished = ref(false);
		const refreshing = ref(false);

		//点击加载更多
		const loadMore = () => {
			loading.value = true;
			getFeeList(pageIndex.value);
		};
		//下拉刷新
		const onRefresh = () => {
			// 刷新清空页面;
			feeList.value = [];
			// 页码清零
			pageIndex.value = 1;
			// 未结束
			finished.value = false;
			showMore.value = false;
			onLoad();
			getFeeList(pageIndex.value);
		};
		const onLoad = () => {
			loading.value = false;
			showMore.value = pageIndex.value > 3 ? false : true; //3为后端返回size值
		};

		// 获取数据
		const getFeeList = (page: number) => {
			console.log(page);
			const size = 3; //3为后端返回size值
			feeList.value.push(
				{
					id: "0001",
					code: "001016",
					name: "Project1",
					money: 999,
					feeType: "差旅报销",
					date: "2020-10-16",
				},
				{
					id: "0002",
					code: "001017",
					money: 999,
					feeType: "日常报销-其他",
					name: "Project2",
					date: "2020-10-17",
				}
			);
			loading.value = false;
			refreshing.value = false;
			pageIndex.value++;
			if (page > size) {
				finished.value = true;
				showMore.value = false;
			}
		};
		// 默认请求一次数据
		getFeeList(pageIndex.value);
		// 点击填报
		const fillForm = () => {
			console.log("fillForm");
		};

		return {
			feeList,
			showMore,
			loading,
			finished,
			refreshing,
			onLoad,
			loadMore,
			getFeeList,
			onRefresh,
			fillForm,
		};
	},
});
</script>
<style scoped lang="less">
.fee {
	&_bottom {
		background-color: #fff;
		padding: 32px 16px 16px 16px;
	}
}
</style>
