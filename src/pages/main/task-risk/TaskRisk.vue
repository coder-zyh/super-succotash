<template>
	<div class="page task-risk">
		<TaskNavBar
			title="风险任务列表"
			type="risk"
			department-type="RISK"
			:collection-status="collectionStatus"
			:showState="showState"
			:taskState="taskState"
		/>
		<div class="page_content task-risk_content">
			<div class="page-top_content task-risk_content-top">
				<van-tabs @click="onClick">
					<van-tab title="催收中"></van-tab>
					<van-tab title="已结清"></van-tab>
				</van-tabs>
			</div>
			<div>
				<van-empty v-if="dataList.length == 0" description="暂无数据" />
				<TaskList
					:list="dataList"
					:show-state="showState"
					:loading="loading"
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
//风险任务
import { defineComponent, ref, reactive, onMounted } from "vue";
import TaskList from "../../../components/TaskList.vue";
import TaskNavBar from "../components/TaskNavBar.vue";
import { CaseBaseInfo } from "@/types/case.interface";
import { useRouter } from "vue-router";
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { useDict } from "@/utils/hook.service";
export default defineComponent({
	name: "Risk",
	components: {
		TaskNavBar: TaskNavBar,
		TaskList,
	},
	setup() {
		const router = useRouter();
		const taskState = ref("collection");
		function goPage(item) {
			router.push({
				path: `/case-detail/${item.id}`,
				query: { taskState: taskState.value },
			});
		}
		function onClick(name, title) {
			if (title == "已结清") {
				collectionStatus.value = "INNER_PAYOFF";
				showState.value = false;
				taskState.value = "settle";
			} else {
				collectionStatus.value = "INNER_COLLECTING";
				showState.value = true;
				taskState.value = "collection";
			}
			page.value = 1;
			dataList.value = [];
			finished.value = false;
			onLoad();
		}
		const dataList = ref<CaseBaseInfo[]>([]);
		const loading = ref(false);
		const showState = ref(true);
		const taskLoading = ref(false);
		const finished = ref(false);
		const service = new AppService();
		const collectionStatus = ref("INNER_COLLECTING");
		const dataSource = ref([]);
		function getdictService() {
			const dictService = useDict();
			dataSource.value = dictService.getDictData("Marital", "Sex", "Education");
		}
		const page = ref(1);
		function onLoad() {
			taskLoading.value = true;
			service
				.getOverdueCaseList(
					new RequestParams({
						departmentType: "RISK",
						collectionStatus: collectionStatus.value,
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
		onMounted(() => {
			getdictService(), onLoad();
		});
		return {
			goPage,
			onClick,
			dataList,
			loading,
			collectionStatus,
			taskLoading,
			finished,
			onLoad,
			showState,
			taskState,
		};
	},
});
</script>

<style lang="less" scoped>
.task-risk_content {
	background-color: #e9e9e9;
	min-height: 85vh;
	&-top {
		text-align: center;
		padding: 6px 0;
		// width: 96%;
		span {
			padding: 10px 20px;
			display: inline-block;
			border: 1px solid #000;
		}
	}
}
</style>
