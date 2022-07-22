<template>
	<div class="page report">
		<!-- 时间选择器 -->
		<ReportDate
			:date="selectDate"
			@update:date="onDateChange"
			@append="addItem"
		/>

		<!-- 项目列表 -->
		<van-form>
			<div
				v-for="(item, index) in projectList"
				:key="item.id"
				class="report_item"
			>
				<div
					class="report_item__title flex justify-content-between align-items-center"
				>
					<div>项目({{ index + 1 }})</div>
					<div>
						<van-button
							v-if="index > 0"
							size="mini"
							type="primary"
							plain
							class="report_item__button"
							@click="() => deleteProject(item.id)"
						>
							删除
						</van-button>
					</div>
				</div>
				<ReportItem
					v-model:timeCount="item.timeCount"
					v-bind="item"
					@click="onProjectEvent"
				/>
			</div>
		</van-form>

		<!-- 展示总计 -->
		<van-cell-group v-if="projectList.length > 1" title="合计">
			<van-cell title="合计工时" :value="totalTimes"></van-cell>
			<van-cell title="合计预估费用" :value="totalAmount"></van-cell>
		</van-cell-group>

		<div class="report_bottom">
			<van-button type="primary" round block @click="submit">提交</van-button>
		</div>

		<van-popup v-model:show="showPicker" position="bottom">
			<ProjectPicker
				@cancel="onProjectEvent('project')"
				@confirm="onProjectPicked"
			/>
		</van-popup>

		<van-popup :show="showFees" position="bottom" class="report_fees">
			<ReportFee
				ref="feeRef"
				:pid="porjectId"
				@cancel="onProjectEvent('fee')"
				@confirm="onFeeFinsh"
			/>
		</van-popup>
	</div>
</template>
<script lang="ts">
import ReportItem from "./components/ReportItem.vue";
import { ProjectItem, FeeItem } from "@/types/project.interface";
import { ref, defineComponent, nextTick, computed } from "vue";
import { useFilter } from "@/utils/hook.service";
import ReportDate from "./components/ReportDate.vue";
import ProjectPicker from "@/components/ProjectPicker.vue";
import ReportFee from "./components/ReportFee.vue";

export default defineComponent({
	name: "Report",
	components: {
		ReportDate,
		ReportItem,
		ProjectPicker,
		ReportFee,
	},
	setup() {
		const filter = useFilter();
		const selectDate = ref("");
		const today = filter.dateFormat(new Date());
		selectDate.value = today;

		const showPicker = ref(false);
		const showFees = ref(false);

		const projectList = ref<ProjectItem[]>([]);
		const feeList = ref<FeeItem[]>([]);
		const porjectId = ref("");
		const feeRef = ref();

		// 添加新项目
		const addItem = () => {
			projectList.value.push({
				id: Date.now().toString(),
				code: "",
				name: "",
				timeCount: 0,
				date: selectDate.value,
				totalAmount: null,
			});
		};

		// 默认添加一条
		addItem();

		// 最终保存
		const submit = () => {
			//
		};

		// 填报日期选择
		const onDateChange = (dateStr: string) => {
			selectDate.value = dateStr;
			projectList.value.forEach((x) => (x.date = dateStr));
		};

		// 项目点击事件
		const onProjectEvent = (type: "project" | "fee", pid?: string) => {
			porjectId.value = pid || "";
			if (type === "fee") {
				showFees.value = pid ? true : false;
			} else {
				showPicker.value = pid ? true : false;
			}
		};

		// 项目选中后保存
		const onProjectPicked = (param: PickerResult) => {
			const project = projectList.value.find((x) => x.id === porjectId.value);
			if (!project) return;
			project.name = param.text;
			project.code = param.value;
			onProjectEvent("project");
		};

		// 费用项保存
		const onFeeFinsh = (amount: number) => {
			const project = projectList.value.find((x) => x.id === porjectId.value);
			if (!project) return;
			project.totalAmount = amount;
			onProjectEvent("fee");
		};

		// 删除选填项目
		const deleteProject = (pid: string) => {
			const index = projectList.value.findIndex((x) => x.id === pid);
			projectList.value.splice(index, 1);
			// 删除费用项
			if (feeRef.value != undefined) {
				nextTick(() => feeRef.value.deleteFees(pid));
			}
		};

		const totalTimes = computed(() =>
			projectList.value.reduce((s, c) => s + (c.timeCount || 0), 0)
		);
		const totalAmount = computed(() =>
			projectList.value.reduce((s, c) => s + (c.totalAmount || 0), 0)
		);

		return {
			selectDate,
			projectList,
			porjectId,
			showPicker,
			showFees,
			feeRef,
			totalTimes,
			totalAmount,
			// functon
			addItem,
			submit,
			onDateChange,
			deleteProject,
			onProjectEvent,
			onProjectPicked,
			onFeeFinsh,
		};
	},
});
</script>
<style lang="less" scoped>
.report {
	&_item {
		&__title {
			padding: 22px 16px 10px 16px;
			color: #999;
			font-size: 12px;
		}
		&__button {
			background: transparent;
		}
	}
	&_bottom {
		background: #fff;
		padding: 32px 16px 16px 16px;
	}
}
</style>
