<template>
	<div class="page_content project">
		<van-nav-bar
			title="项目"
			fixed
			right-text="日期"
			@click-right="onClickRight"
		></van-nav-bar>

		<van-popup
			v-model:show="showPopup"
			position="top"
			:style="{ height: '70%' }"
		>
			<van-calendar
				ref="calendar"
				type="range"
				:poppable="false"
				row-height="50"
				:min-date="minDate"
				:max-date="maxDate"
				allow-same-day
				@confirm="onConfirm"
			>
				<!-- <template #footer>
					<div class="footer">
						<div class="footer_item"><van-button>清除</van-button></div>
						<div class="footer_item">
							<van-button type="danger" @click="onConfirm">确认</van-button>
						</div>
					</div>
				</template> -->
			</van-calendar>
		</van-popup>

		<van-search
			v-model="searchValue"
			placeholder="请输入项目名称"
			@focus="onFocus"
		></van-search>

		<ProjectList
			:project-list="filterList"
			:current="current"
			@refresh="onRefresh"
		/>
	</div>
</template>
<script lang="ts" setup>
import ProjectList from "./components/ProjectList.vue";
import { AppService } from "@/api/services/app.service";
import { ProjectItemInfo } from "@/types/project.interface";
import { onBeforeMount, ref, computed } from "vue";
import dayjs from "dayjs";

// 请求操作
const APP = new AppService();
const getProjectViewList = (data: { code: string; peroid: string }) => {
	APP.getProjectViewList(data).subscribe({
		next: (data) => {
			projectList.value = data;
			current.value = false;
		},
	});
};
// 挂载前调用
onBeforeMount(() => {
	getProjectViewList({ code: "", peroid: "" });
});
// 定义数据列表项类型
const projectList = ref<ProjectItemInfo[]>([]);
// 刷新列表操作
const current = ref<boolean>(false);
const onRefresh = () => {
	getProjectViewList({ code: "", peroid: "" });
	current.value = true;
};
// 搜索操作
const searchValue = ref("");
const onFocus = () => {
	dateRange.value = [];
};
//日期选择操作
const dateRange = ref<Date[]>([]);
const showPopup = ref(false);
const onClickRight = () => {
	showPopup.value = true;
};
// const calendar = ref<CalendarInstance>();
const onConfirm = (value: Date[]) => {
	dateRange.value = value;
	showPopup.value = false;
	// console.log(calendar.value?.title);
};
// 日期区间
const maxDate = new Date(); //当前日期为最大可选日期
const minDate = computed(() => {
	//筛选项目列表最小创建日期为最小可选日期
	const value = projectList.value.reduce((prev, cur) => {
		if (dayjs(prev.createdate).isBefore(cur.createdate)) {
			return prev;
		} else {
			return cur;
		}
	});
	return new Date(value.createdate);
});

// 筛选
const filterList = computed(() => {
	const search = searchValue.value;
	const date = dateRange.value;
	return projectList.value.filter((v) => {
		const flagP = v.projectName.includes(search);
		const flagD =
			dayjs(date[0]).isAfter(dayjs(v.createdate)) &&
			dayjs(date[1]).isBefore(dayjs(v.endDate));
		if (date.length) {
			return flagP && flagD;
		}
		return flagP;
	});
});
</script>
<style lang="less" scoped>
.footer {
	display: flex;
	&_item {
		flex: 1;
		text-align: center;
	}
}
</style>
