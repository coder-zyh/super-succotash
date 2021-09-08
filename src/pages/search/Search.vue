<template>
	<div class="page search">
		<van-nav-bar
			left-arrow
			left-text="返回"
			right-text="搜索"
			fixed
			@click-left="back"
			@click-right="onLoad"
		>
			<template #title>
				<van-search
					v-model="searchStr"
					shape="round"
					:placeholder="placeholder"
					@clear="onClear"
				/>
			</template>
		</van-nav-bar>
		<div class="page_content search_content">
			<SearchTips
				v-if="searchState"
				:personal-no-status="personalNoStatus"
				:detail-status="detailStatus"
				:personal-name-status="personalNameStatus"
				@tipsClick="tipsClick"
			/>
			<van-empty
				v-if="dataList.length == 0 && !searchState"
				description="暂无数据"
			/>
			<div v-if="!searchState && dataList.length > 0">
				<!-- <TaskItem v-for="data of dataList" :key="data.id" :data="data" /> -->
				<TaskList
					:list="dataList"
					:show-state="showState"
					:finished="finished"
					@taskPage="goPage"
					@onLoad="onLoad"
				/>
				<van-loading v-if="taskLoading" size="30px">加载中...</van-loading>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { CaseType } from "@/utils/usePropType";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import SearchTips from "./components/SearchTips.vue";
import { CaseBaseInfo } from "@/types/case.interface";
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import TaskList from "../../components/TaskList.vue";
import { useDict, useFilter } from "@/utils/hook.service";
export default defineComponent({
	name: "Search",
	components: {
		SearchTips,
		// TaskItem,
		TaskList,
	},
	props: {
		/**
		 * case type
		 */
		type: CaseType,
	},
	setup(props, context) {
		const searchStr = ref("");
		const searchKey = ref("personalName");
		const searchState = ref(true);
		const placeholder = ref("请输入客户姓名搜索");
		const personalNoStatus = ref(true);
		const detailStatus = ref(true);
		const personalNameStatus = ref(false);
		const dataList = ref<CaseBaseInfo[]>([]);
		const { back } = useRouter();
		const router = useRouter();
		const route = useRoute();
		const service = new AppService();
		const dataSource = ref([]);
		function getdictService() {
			const dictService = useDict();
			dataSource.value = dictService.getDictData("Marital", "Sex", "Education");
		}
		const showState = ref(true);
		const taskLoading = ref(false);
		const finished = ref(false);
		const filter = useFilter();
		const page = ref(1);
		function onLoad() {
			searchState.value = false;
			taskLoading.value = true;
			service
				.getOverdueCaseList(
					new RequestParams({
						departmentType: route.query.departmentType,
						collectionStatus: route.query.collectionStatus,
						[searchKey.value]: searchStr.value,
						page: page.value,
						size: 10,
					})
				)
				.subscribe({
					next: (value: any) => {
						taskLoading.value = false;
						value.forEach((element) => {
							Object.keys(element).forEach((key) => {
								dataSource.value.forEach((item) => {
									if (item.code == element[key]) {
										element[key] = item.name;
									}
								});
								if (key == "overdueAmount" && element[key]) {
									element[key] = filter.toThousands(element[key]);
								}
							});
						});
						dataList.value = [...dataList.value, ...value];
						if (dataList.value.length > 0 && value.length < 1) {
							finished.value = true;
						}
						page.value += 1;
					},
				});
		}
		function goPage(item) {
			router.push({
				path: `/case-detail/${item.id}`,
				query: { taskState: route.query.taskState },
			});
		}
		function onClear() {
			searchState.value = true;
			dataList.value = [];
		}
		function tipsClick(val) {
			switch (val) {
				case "personalNo":
					personalNoStatus.value = false;
					detailStatus.value = true;
					personalNameStatus.value = true;
					placeholder.value = "请输入客户编号搜索";
					searchKey.value = "personalNo";
					break;
				case "detail":
					personalNoStatus.value = true;
					detailStatus.value = false;
					personalNameStatus.value = true;
					placeholder.value = "请输入客户地址搜索";
					searchKey.value = "detail";
					break;
				case "personalName":
					personalNoStatus.value = true;
					detailStatus.value = true;
					personalNameStatus.value = false;
					placeholder.value = "请输入客户姓名搜索";
					searchKey.value = "personalName";
					break;
			}
		}
		onMounted(() => {
			getdictService();
			showState.value = route.query.showState == "true" ? true : false;
		});
		return {
			searchStr,
			searchState,
			dataList,
			back,
			goPage,
			tipsClick,
			personalNoStatus,
			detailStatus,
			personalNameStatus,
			placeholder,
			searchKey,
			onClear,
			finished,
			onLoad,
			showState,
			taskLoading,
		};
	},
});
</script>

<style lang="less" scoped>
.search {
	background-color: #e9e9e9;
	height: 100vh;
}
.van-search {
	padding: 0;
}
</style>
